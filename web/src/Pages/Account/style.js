/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev */
import {makeStyles} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    dangerZone: {
        backgroundColor: red[700],
        color: theme.palette.common.white,
        borderColor: theme.palette.common.white,
    }
}));

export default useStyles;