import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": JSON.stringify(env),
    },
    plugins: [react()],
    base: "/",
    resolve: {
      alias: {
        "@/": root,
      },
    },
    server: {
      host: true,
    },
  };
});
