import { makeStyles } from '@material-ui/core/styles';

const loginStyles = makeStyles((theme) => ({
    '*':{
        fontFamily: 'Play ,sans-serif',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        paddingBottom: theme.spacing(4),
    },
    layout: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    form: {
        width: '100%',
    },
    submit: {
        fontFamily: 'Play ,sans-serif',
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#2E8C4E',
        color: "white",
        '&:hover': {
            backgroundColor: '#2E8C4E',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },

    },
    disabled:{
        display: 'none !important',
    },
    link: {
       color: '#2E8C4E',
       fontFamily: 'Play ,sans-serif',
       textDecoration: 'none',

    },
    block: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textHeader:{
        fontFamily: 'Play ,sans-serif',
    },
    containerForm:{
        margin: theme.spacing(2),
    },
    captchaBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }

}));

export default loginStyles;
