module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      main_blue: "#DDDDDD",
      second_blue: "#3D56B2",
      third_blue: "#5C7AEA",
      yellow: "#FFAA4C",
      red: "#B61919",
      blue1: "#276678",
      blue2: '#1687A7',
      blue3: '#D3E0EA',
      blue4: '#F6F5F5',
      transparent: "transparent"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
