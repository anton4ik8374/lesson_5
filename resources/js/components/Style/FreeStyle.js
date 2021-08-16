import {makeStyles} from '@material-ui/core/styles';

const FreeStyle = makeStyles((theme) => ({
    root:{
        width: '100vh'
    },
    mainBlock: {
        //marginTop: theme.spacing(12),
        flexGrow: 1,

    },
    disabled:{
        display: 'none !important',
    },
    centreBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        padding: 0,
        backgroundColor: '#F0F0F0'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingBottom: theme.spacing(4),
        marginTop: theme.spacing(6),
    },
    paperNonTop: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    submitMy: {
        fontFamily: 'Play ,sans-serif',
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'orange',
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: '#FF8000',
            borderColor: 'white',
            boxShadow: 'none',
        },

    },
    articlesContainerAll:{
        display: "flex",
        backgroundColor: '#F0F0F0',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
}));

export default FreeStyle;
