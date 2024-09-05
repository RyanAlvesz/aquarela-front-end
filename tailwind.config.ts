import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-1': "var(--blue-1)",
        'blue-2': "var(--blue-2)",
        'blue-3': "var(--blue-3)",
        'blue-4': "var(--blue-4)",
        'blue-5': "var(--blue-5)",
        'blue-6': "var(--blue-6)",
        'blue-7': "var(--blue-7)",
        'blue-8': "var(--blue-8)"
      },
    },
  },
  plugins: [],
};
export default config;
