import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        colorDefault: theme.palette.primary.dark,
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    leftColumn: {
        backgroundColor: theme.palette.layout.main,
        color: theme.palette.common.white,
        borderTop: `1px solid ${theme.palette.util.separator}`,
    },
    topLine: {
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
    leftPanelButtonsText: {
        paddingLeft: theme.spacing(1),
    },
    searchLineBase: {
        display: 'flex',
        width: '100%',
    },
    createThreadButtonContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
    },
    createThreadButtonBox: {
        display: 'flex',
        width: '100%',
    }
}));

export default useStyles;