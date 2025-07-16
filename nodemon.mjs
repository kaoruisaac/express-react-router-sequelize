import { config } from "dotenv";
import nodemon from 'nodemon';
config();

nodemon({
  watch: ['server'],
  ext: 'ts,mjs,js,json',
  ignore: 'node_modules',
  exec: `node esbuild.mjs --mode development && node ./dist/server.js`,
})

