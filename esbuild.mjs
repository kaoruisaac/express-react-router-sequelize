import esbuild from 'esbuild';
import { config } from 'dotenv';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

config();

console.time('build-time')
console.log('-----------------------------')
console.log('start to build ...')
esbuild.build({
  format: 'esm',
  platform: 'node',
  minify: false,
  bundle: true,
  entryPoints: ['server/server.ts'],
  outfile: 'dist/server.js',
  external: ['../build/server/index.js'],
  sourcemap: false,
  plugins: [
    // ...(IS_DEV ? [] : [eslint()]),
    nodeExternalsPlugin(),
  ],
}).then(() => {
  console.log('--------------------')
  console.timeEnd('build-time')
  console.log('--------------------')
});