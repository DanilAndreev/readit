import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    threadsList: {
        paddingRight: theme.spacing(6),
    },
    pagination: {
        display: 'inline-flex',
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    ratingBadge: {
        color: theme.palette.grey[500],
    }
}));

export default useStyles;