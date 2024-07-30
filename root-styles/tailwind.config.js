/** @type {import('tailwindcss').Config} */

/*
      "../container-app/index.html",
      "../microfrontend1/index.html",
      "../microfrontend2/index.html",
      "../microfrontend3/index.html",
*/

export default {
  content: {
    relative: false,
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,svelte,vue}",
      "../container-app/index.html",
      "../**/index.html",
      "../**/*/src/**/*.{js,ts,jsx,tsx,svelte,vue}",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: []
}
