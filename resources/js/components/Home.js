import React from 'react';
import {observer} from "mobx-react";
import Auth from "./form/Auth";
import ArticlesCmp from "./Articles/Articles";
import {Container, Box} from '@material-ui/core';
import FreeStyle from "./Style/FreeStyle";

const Home = () => {

    const classes = FreeStyle();

    return (
        <Box component="main" className={classes.mainBlock}>
            <Container className={classes.centreBlock}>
                <Auth/>
                <ArticlesCmp/>
            </Container>
        </Box>
    );
}

export default observer(Home);
