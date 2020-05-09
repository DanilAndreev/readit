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
        layout: {
            main: blueGrey[800],
            dark: blueGrey[900],
            light: blueGrey[50],
        },
    },
});

export default theme;