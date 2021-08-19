import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from '@material-ui/core/styles';
import { Box} from '@material-ui/core';


const SkeletonStyles = makeStyles((theme) => ({
    root:{
        width: '300px'
    },
    mainBlock: {
        flexGrow: 1,
        width: '100%'
    },
    centreBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
    blockContent:{
        height: '90%',
        width: '100%',
        display: 'block'
    }

}));


const ProjectSkeleton = () => {
    const classes = SkeletonStyles();
    return (
        <>
            <Box component="main" className={classes.mainBlock}>
                <Skeleton/>
                <Skeleton animation={false}/>
                <Skeleton animation="wave"/>
                <Skeleton animation="wave"/>
                <Skeleton variant="rect" width={'100%'} height={'200px'} />
                <Skeleton/>

            </Box>
        </>

    );
}

export default ProjectSkeleton;
