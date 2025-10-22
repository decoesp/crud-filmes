import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['cjs'],
  target: 'node18',
  clean: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  bundle: true,
  skipNodeModulesBundle: true,
});
