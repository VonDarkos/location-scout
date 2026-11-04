import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    // Tests always need React's development build (it provides act).
    // Without this, a NODE_ENV=production inherited from the shell breaks every render test.
    env: { NODE_ENV: "test" },
  },
})