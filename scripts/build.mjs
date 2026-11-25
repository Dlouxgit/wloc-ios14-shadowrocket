import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { transform } from 'esbuild';

const root = resolve(import.meta.dirname, '..');
const banner = '/* Derived from Yu9191/wloc (AGPL-3.0); source and build steps are in this repository. */\n';

for (const name of ['wloc.js', 'wloc-settings.js']) {
  const source = await readFile(resolve(root, 'src', name), 'utf8');
  const result = await transform(source, {
    target: 'safari14',
    supported: { destructuring: true },
    minify: true,
    legalComments: 'none',
  });
  await writeFile(resolve(root, 'dist', name), banner + result.code);
}
