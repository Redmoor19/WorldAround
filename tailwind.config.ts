import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        playpen: ["Playpen Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
});
export default config;
