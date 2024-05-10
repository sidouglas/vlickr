import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  extends: {},
  plugins: [
    createThemes(
      {
        dark: {
          base: '#E4EFFF',
          primary: '#2A1845',
          secondary: '#5E369B',
          muted: '#353445',
          'primary-accent': '#0E0817',
        },
        light: {
          base: '#101012',
          primary: '#864DDD',
          secondary: '#5E369B',
          muted: '#D8D6FF',
          'primary-accent': '#E6D6FF',
        },
      },
      {
        defaultTheme: {
          light: 'light',
          dark: 'dark',
        },
      }
    ),
  ],
};
