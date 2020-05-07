import { createMuiTheme } from '@material-ui/core/styles';
import {blueGrey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[700],
            dark: blueGrey[900],
            light: blueGrey[50],
        },
    },
});

export default theme;