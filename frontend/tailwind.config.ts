import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0c0c0c",
        foreground: "#f5f5f5"
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular"]
      }
    }
  },
  darkMode: "class",
  plugins: [],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,ts,jsx,tsx}"]
  }
};

export default config;