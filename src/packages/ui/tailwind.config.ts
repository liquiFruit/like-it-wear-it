import { join } from "path";

/** @type {import('tailwindcss').Config} */
export default {
  content: [join(__filename, "../src") + "/**/*.tsx"] as string[],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
