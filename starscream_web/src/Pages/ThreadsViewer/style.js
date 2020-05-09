import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    leftColumn: {
        backgroundColor: theme.palette.layout.main,
        color: theme.palette.common.white,
    },
    contentColumn: {
        backgroundColor: theme.palette.common.white,
        minHeight: `calc(100vh - 64px)`,
    },
    rightColumn: {
        backgroundColor: theme.palette.layout.light,
    },
}));

export default useStyles;