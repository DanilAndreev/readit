import { createMuiTheme } from '@material-ui/core/styles';
import {blueGrey, grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[100],
            dark: blueGrey[300],
            light: blueGrey[200],
        },
    },
});

export default theme;