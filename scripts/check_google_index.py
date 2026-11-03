#!/usr/bin/env python3
"""Report Google Search Console index status for Setup Finds UK pages.

Needs a Google Cloud service account that has been added as a user on the
Search Console property. Provide its JSON key through the environment:

  GSC_SERVICE_ACCOUNT_JSON   the key file's contents (or a path to the file)

Usage:
  python3 scripts/check_google_index.py                  # every URL in sitemap.xml
  python3 scripts/check_google_index.py shop.html ...    # only these pages

Read-only: uses the webmasters.readonly scope and never changes anything.
"""
import base64
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

SITE = "https://abdul-muntakim.github.io/setupfinds-uk/"
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"
ROOT = Path(__file__).resolve().parent.parent


def load_key():
    raw = os.environ.get("GSC_SERVICE_ACCOUNT_JSON", "").strip()
    if not raw:
        sys.exit("GSC_SERVICE_ACCOUNT_JSON is not set; skipping the Search Console check.")
    if not raw.startswith("{"):
        raw = Path(raw).read_text()
    return json.loads(raw)


def b64(data):
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def access_token(key):
    now = int(time.time())
    header = b64(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    claims = b64(json.dumps({
        "iss": key["client_email"], "scope": SCOPE, "aud": key["token_uri"],
        "iat": now, "exp": now + 3600,
    }).encode())
    private_key = serialization.load_pem_private_key(key["private_key"].encode(), password=None)
    signature = private_key.sign(f"{header}.{claims}".encode(), padding.PKCS1v15(), hashes.SHA256())
    body = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": f"{header}.{claims}.{b64(signature)}",
    }).encode()
    with urllib.request.urlopen(key["token_uri"], body) as response:
        return json.load(response)["access_token"]


def call(token, url, payload=None):
    request = urllib.request.Request(
        url, data=json.dumps(payload).encode() if payload is not None else None,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(request) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        return {"error": f"HTTP {error.code}: {error.read().decode()[:300]}"}


def target_urls(args):
    if args:
        return [SITE if a in ("/", "index.html") else SITE + a.lstrip("/") for a in args]
    return re.findall(r"<loc>([^<]+)</loc>", (ROOT / "sitemap.xml").read_text())


def main():
    token = access_token(load_key())
    site_param = urllib.parse.quote(SITE, safe="")

    sitemaps = call(token, f"https://www.googleapis.com/webmasters/v3/sites/{site_param}/sitemaps")
    if "error" in sitemaps:
        print("Sitemaps:", sitemaps["error"])
    for sm in sitemaps.get("sitemap", []):
        print(f"Sitemap {sm['path']}: last read {sm.get('lastDownloaded', 'never')}, "
              f"errors {sm.get('errors', 0)}, warnings {sm.get('warnings', 0)}")
    print()

    counts = {}
    for url in target_urls(sys.argv[1:]):
        result = call(token, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
                      {"inspectionUrl": url, "siteUrl": SITE, "languageCode": "en-GB"})
        if "error" in result:
            state, crawled = result["error"], ""
        else:
            status = result["inspectionResult"]["indexStatusResult"]
            state = status.get("coverageState", status.get("verdict", "unknown"))
            crawled = status.get("lastCrawlTime", "never crawled")
        counts[state] = counts.get(state, 0) + 1
        print(f"{url.replace(SITE, '/') or '/'}\n    {state} | last crawl: {crawled}")

    print("\nSummary:")
    for state, count in sorted(counts.items(), key=lambda item: -item[1]):
        print(f"  {count:3d}  {state}")


if __name__ == "__main__":
    main()
