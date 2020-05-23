import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignContent: 'center',
        '&:hover div': {
            display: 'block',
            backgroundColor: 'rgba(0.5,0.5,0.5,0.4)',
            zIndex: '1000',
        },
    },
    input: {
        zIndex: '1001',
        left: '0',
        top: '-100px',
        width: '100%',
        height: 'calc(100% + 100px)',
        position: 'absolute',
        color: 'transparent',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'rgba(0.2,0.2,0.2,0.2)',
        },
        '&:active': {
            backgroundColor: 'rgba(0.2,0.2,0.2,0.3)',
        },
    },
    message: {
        marginTop: 'calc(50% - 26px)',
        borderRadius: '5px',
        textAlign: 'center',
        height: '20px',
        width: '60%',
        padding: theme.spacing(2),
    },
    messageUnloaded: {
        display: 'block',
        backgroundColor: 'rgba(0.5,0.5,0.5,0.4)',
        zIndex: '1000',
    },
    img: {
        color: 'white',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0px',
        top: '0px',
    },
    imgIcon: {
        color: 'white',
        width: '80%',
        height: '80%',
        position: 'absolute',
        left: '0px',
        top: '0px',
        padding: '10%',
    },
    displayNone: {
        display: 'none',
    },
    displayBlock: {
        display: 'block',
    },

}));

export default useStyles;