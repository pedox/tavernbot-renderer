module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
      },
      width: {
        310: "310px",
        280: "280px",
      },
      colors: {
        cream: {
          100: "#f5f1eb",
          200: "#e9e5dc",
          300: "#ece5d8",
          500: "#e0d6cb",
          900: "#c7b6a6",
        },
        rarity1: {
          100: "#626166",
          900: "#807c7c",
        },
        rarity2: {
          100: "#4e6b66",
          900: "#518f74",
        },
        rarity3: {
          100: "#576083",
          900: "#4c82a6",
        },
        rarity4: {
          100: "#686393",
          900: "#a174b6",
        },
        rarity5: {
          100: "#885a2f",
          900: "#b97527",
        },
        gold: {
          100: "#ffcc32",
          500: "#d3bc8e",
        },
        bblue: {
          100: "#2acce9",
          500: "#236f8d",
          600: "#495366",
          800: "#233755",
          900: "#3e4556",
        },
      },
      fontFamily: {
        genshin: '"Genshin","Helvetica Neue",Helvetica,Arial,sans-serif',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
