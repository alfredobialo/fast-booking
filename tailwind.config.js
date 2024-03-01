/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  mode:'jit',
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},

  },
  plugins: [],
}

