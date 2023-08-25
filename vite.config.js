import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "postcss";
import path from "path";
import svgr from "vite-plugin-svgr";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    postcss(),
    svgr({
      exportAsDefault: true,
      svgrOptions: { icon: true },
      include: "**/*.svg",
    }),
    // Include your env variables in the array below using the name from the .env file by adding them as strings
    // always prefixed with 'VITE_' like 'VITE-VUE-APP-${YOUR STRING}' e.g EnvironmentPlugin(['VITE-VUE-APP-API-BASE-URL'])
    EnvironmentPlugin(["VITE_REACT_APP_CLOUDINARY_BASEURL", "VITE_REACT_APP_CLOUDINARY_PRESET"]),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/app",
  },
  server: {
    port: 5170,
  },
});
