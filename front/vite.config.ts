import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    root: "./src",
    publicDir: "./public/",
    build: {
        outDir: "./dist/",
        emptyOutDir: true,
    },
    plugins: [react()],
    server: {
        open: true,
        watch: {
            usePolling: true,
        },
    },
});
