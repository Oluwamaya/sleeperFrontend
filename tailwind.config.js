/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Ensure Tailwind scans Angular templates and TypeScript files.
  ],
  theme: {
    extend: {}, // Add customizations here if needed.
  },
  plugins: [
    require('daisyui'), // DaisyUI plugin
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Specify themes here.
  },
}

