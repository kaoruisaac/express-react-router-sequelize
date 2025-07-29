import esbuild from 'esbuild';
import { config } from 'dotenv';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";

const changelog = parse(readFileSync("./CHANGELOG.yml", "utf8"));
let APP_VERSION = changelog[0].version;

// 將 APP_VERSION 更新到 .env 裡
let env;
try { env = readFileSync('.env', "utf8"); } catch { env = ''; }

if (/APP_VERSION=.*/.test(env)) {
  env = env.replace(/APP_VERSION=.*/, `APP_VERSION=${APP_VERSION}`);
} else {
  env += `\nAPP_VERSION=${APP_VERSION}`;
}
writeFileSync('.env', env);
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