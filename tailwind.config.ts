import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: 'var(--font-ubuntu)',
        gloria: 'var(--font-gloria)'
      },
      colors: {
        'blue-1': "rgb(var(--blue-1))",
        'blue-2': "rgb(var(--blue-2))",
        'blue-3': "rgb(var(--blue-3))",
        'blue-4': "rgb(var(--blue-4))",
        'blue-5': "rgb(var(--blue-5))",
        'blue-6': "rgb(var(--blue-6))",
        'blue-7': "rgb(var(--blue-7))",
        'blue-8': "rgb(var(--blue-8))"
      },
      backgroundImage: {
        'venice-bridge': 'var(--venice-bridge)',
        'starry-night': 'var(--starry-night)'
      },
      fontSize: {
        'title-mobile': ['calc(2rem + 1vw)', {
          lineHeight: '1'
        }],
        'subtitle-mobile': '1.5rem',
        'body-mobile': '1rem',
        'secondary-mobile': '0.75rem',
        'title-desktop': ['calc(3rem + 2vw)', {
          lineHeight: '1'
        }],
        'subtitle-desktop': '1.5rem',
        'body-desktop': '1.25rem',
        'secondary-desktop': '1rem',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1920px',
    },
  },
  plugins: [
    require('tailwindcss-animated'), require('@tailwindcss/typography')
  ],
};
export default config;
