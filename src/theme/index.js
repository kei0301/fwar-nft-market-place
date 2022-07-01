import { extendTheme } from '@chakra-ui/react';

import color from './color';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: '#6e6b7b',
        fontFamily: 'Montserrat, Roboto, Helvetica, Arial, serif;'
      }
    }
  },
  colors: color,
  shadows: {
    content: '0 4px 24px 0 rgba(34,41,47,.3)',
    drawer: '0 4px 24px 0 rgba(34,41,47,.05)',
    button: '0 8px 25px -8px rgba(34,41,47,.5)'
  }
  // components: {
  //   Button: {
  //     // 1. We can update the base styles
  //     baseStyle: {
  //       fontWeight: 'bold' // Normally, it is "semibold"
  //     },
  //     // 2. We can add a new button size or extend existing
  //     sizes: {
  //       xl: {
  //         h: '56px',
  //         fontSize: 'lg',
  //         px: '32px'
  //       }
  //     },
  //     // 3. We can add a new visual variant
  //     variants: {
  //       'with-shadow': {
  //         bg: 'red.400',
  //         boxShadow: '0 0 2px 2px #efdfde'
  //       },
  //       // 4. We can override existing variants
  //       solid: (props) => ({
  //         bg: props.colorMode === 'dark' ? color.primary.base : color.primary.base,
  //         color: 'white'
  //       })
  //     }
  //   }
  // }
});
export default theme;
