import {makeStyles} from '@material-ui/core/styles';
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.footer.main,
        borderTop: '5px solid',
        borderColor: theme.palette.footer.light,
        color: theme.palette.common.white,
    },
    copyright: {
        backgroundColor: theme.palette.footer.dark,
        color: theme.palette.common.white,
    }
}));

export default useStyles;