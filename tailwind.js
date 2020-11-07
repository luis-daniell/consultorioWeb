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
      },

      height: {
        login: '80%'
      },

      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      }



    }



    
  },
  variants: {},
  plugins: [],
}
