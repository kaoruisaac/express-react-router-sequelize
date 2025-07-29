import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { RemixComponentCssLoader } from "remix-component-css-loader";

export default defineConfig({
  plugins: [
    RemixComponentCssLoader(),
    reactRouter(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  define: {
    'APP_VERSION': JSON.stringify(process.env.APP_VERSION),
  },
});
