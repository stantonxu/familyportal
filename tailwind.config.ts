import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f4f7fb',
          100: '#e9eef6',
          200: '#cbd7ea',
          300: '#a8bbd9',
          400: '#809ac5',
          500: '#5d7dae',
          600: '#466192',
          700: '#384c74',
          800: '#2f3f5d',
          900: '#27354c',
          950: '#171f2e'
        }
      }
    }
  },
  plugins: []
};

export default config;
