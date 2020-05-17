import {makeStyles} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    listItemTextFix: {
        paddingRight: theme.spacing(5),
    },
    dangerZone: {
        backgroundColor: red[700],
        color: theme.palette.common.white,
        borderColor: theme.palette.common.white,
    },
}));

export default useStyles;