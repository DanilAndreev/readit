import { createMuiTheme } from '@material-ui/core/styles';
import {blueGrey, green, grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[100],
            dark: blueGrey[300],
            light: blueGrey[50],
        },
        secondary: {
            main: green[700],
            dark: green[900],
            light: green[500],
        },
        util: {
            separator: 'rgba(0, 0, 0, 0.12)',
        },
        layout: {
            main: blueGrey[800],
            dark: blueGrey[900],
            light: blueGrey[50],
        },
        footer: {
            light:  blueGrey[800],
            main: blueGrey[900],
            dark: grey[900],
        }
    },
});

export default theme;