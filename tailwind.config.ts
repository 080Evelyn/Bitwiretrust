import type { Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindForms],
};

export default config;
