/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'grid',
    'flex',
    {pattern: /bg-./},
    {pattern: /text-./},
    {pattern: /border-./},
    {pattern: /grid-./},
    {pattern: /gap-./},
    {pattern: /space-./},
  ]
}

