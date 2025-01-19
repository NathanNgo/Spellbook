import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    root: "./src",
    publicDir: "./public/",
    build: {
        outDir: "./dist/",
        emptyOutDir: true,
    },
    plugins: [react(), tsconfigPaths()],
    server: {
        open: true,
        watch: {
            usePolling: true,
        },
    },
});
