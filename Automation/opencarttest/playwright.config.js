import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    headless: true, // Cambia a false si quieres ver el navegador
    video: "on", // Graba videos de cada test
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  reporter: [["html", { open: "never" }]], // Reporte HTML
});
