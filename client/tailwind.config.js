/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#8241ec",
        "background-light": "#f7f6f8",
        "background-dark": "#0a080d",
        "surface-dark": "#171121",
        "brandDark": "#08080f",
        "brandBlue": "#3b82f6",
        "brandPink": "#ec4899",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    import('@tailwindcss/container-queries'),
    import('@tailwindcss/forms')
  ]
}

