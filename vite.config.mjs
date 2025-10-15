import { defineConfig } from "vite";
import path from 'node:path';
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      components: path.resolve(process.cwd(), 'src/components'),
      pages: path.resolve(process.cwd(), 'src/pages'),
      hooks: path.resolve(process.cwd(), 'src/hooks'),
      styles: path.resolve(process.cwd(), 'src/styles'),
      utils: path.resolve(process.cwd(), 'src/utils'),
    }
  },
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true
  }
});