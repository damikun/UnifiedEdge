/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'explorer-background': "linear-gradient(rgba(248, 250, 252, 0.8), rgba(248, 250, 252, 0.95)), url('/public/images/explorer_background.png')",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" }
        }
      },
      maxWidth: {
        '8/12': '66%',
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      },
      minHeight: {
        '32': '8rem',
        '40': '10rem',
        '96': '24rem',
        '102': '28rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      width: {
        '102': '28rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      },
      height: {
        '102': '28rem',
        '128': '32rem',
        '160': '40rem',
        '192': '48rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
}