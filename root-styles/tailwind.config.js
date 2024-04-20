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
    'border',
    'hover',
    {pattern: /flex-./},
    {pattern: /m-./},
    {pattern: /mx-./},
    {pattern: /my-./},
    {pattern: /mt-./},
    {pattern: /mb-./},
    {pattern: /ml-./},
    {pattern: /mr-./},
    {pattern: /p-./},
    {pattern: /px-./},
    {pattern: /py-./},
    {pattern: /bg-./},
    {pattern: /text-./},
    {pattern: /border-./},
    {pattern: /grid-./},
    {pattern: /col-span-./},
    {pattern: /row-span-./},
    {pattern: /gap-./},
    {pattern: /space-./},
    {pattern: /animate-./},
    {pattern: /shadow-./},
    {pattern: /w-./},
    {pattern: /h-./},
    {pattern: /rounded-./},
    {pattern: /m-./},
    {pattern: /-m-./},
  ]
}

