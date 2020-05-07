import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    leftColumn: {
        backgroundColor: theme.palette.primary.main,
    },
    contentColumn: {
        backgroundColor: theme.palette.common.white,
    },
    rightColumn: {
        backgroundColor: theme.palette.primary.light,
    },
}));

export default useStyles;