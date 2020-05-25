/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import { createMuiTheme } from '@material-ui/core/styles';
import {blueGrey, grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: grey[900],
            },
        },
    },
    palette: {
        primary: {
            main: blueGrey[600],
            dark: blueGrey[900],
            light: blueGrey[100],
        },
/*
        secondary: {
            main:
        },

 */
        layout: {
            main: blueGrey[800],
            dark: blueGrey[900],
            light: blueGrey[50],
        },
        util: {
            separator: 'rgba(0, 0, 0, 0.12)',
        },
        footer: {
            light:  blueGrey[800],
            main: blueGrey[900],
            dark: grey[900],
        }
    },
});

export default theme;