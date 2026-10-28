import { build } from 'esbuild';

await build({
  entryPoints: ['src/effects.js'],
  outfile: 'effects.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  legalComments: 'eof',
});
