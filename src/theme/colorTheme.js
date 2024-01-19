import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';


export const colorTheme = createTheme({

    palette: {
        primary: {
            main: '#0d1117',
        },
        secondary: {
            main: '#01040a',
        },
        error: {
            main: red.A400,
        }
    },
    typography: {
        fontFamily: 'Roboto, Aboreto, Arial, sans-serif',
    },

})


// // Amarillo '#CDFF00'
// main: '#01040a',
// main: '#0d1117',

