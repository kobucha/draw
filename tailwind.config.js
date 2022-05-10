module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./views/**/*.pug",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton'],
        caveat: ['Caveat'],
        barlow_condensed: ['Barlow Condensed'],
        roboto: ['Roboto'],
        bebas_neue: ['Bebas Neue'],
        alfa_slab_one: ['Alfa Slab One']
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s linear",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
