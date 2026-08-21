/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0B5D5A",
        secondary: "#BFEEDB",
        accent: "#2AAE8E",
        background: "#F8FAF9",
        card: "#FFFFFF",
        text: "#18353C",
        subtitle: "#6E7B81",
        muted: "#9AA8B2",
        border: "#E8ECF0",
        danger: "#E74C3C",
        star: "#F4B836",
      },
    },
  },
  plugins: [],
};
