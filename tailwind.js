module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {

      

      fontFamily: {
        source: ['Source Sans Pro', 'bold']
      },

      borderRadius: {
        'extra' : '45px',
      },

      colors:{
        'primeroColor': '#E8FFFF',
        'segundoColor': '#A6F6F1',
        'tercerColor': '#41AEA9',
        'cuartoColor': '#213E3B',
        'colorFondo' : '#F4F6F9',
        'colorBoton' : '#54B6B1',
        'colorBuscador': '#F2F4F6',
      },

      height: {
        login: '80%'

      },

      width: {
        '1/7': '14.28%',
        '2/7': '28.57%',
        '3/7': '42.85%',
        '4/7': '57.14%',
        '5/7': '71.42%',
        '6/7': '85.71%',
      },

      backgroundImage: {
        'usuario' : "url('/src/img/usuario.png')",
      },

      inset: {
        '-18': '-6rem',
      }
    }
  },
  variants: {},
  plugins: [],
}
