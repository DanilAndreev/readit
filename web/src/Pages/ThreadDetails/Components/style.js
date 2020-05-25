import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    listItemTextFix: {
        paddingRight: theme.spacing(6),
        wordWrap: 'break-word',
    },
    worldWrap: {
        wordWrap: 'break-word',
    }
}));

export default useStyles;