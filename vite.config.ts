import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { RemixComponentCssLoader } from 'remix-component-css-loader'
import config from "./config.json";

export default defineConfig({
  plugins: [
    RemixComponentCssLoader(),
    reactRouter(),
    tsconfigPaths(),
  ],
  define: {
    'APP_VERSION': JSON.stringify(config.APP_VERSION),
  },
});
