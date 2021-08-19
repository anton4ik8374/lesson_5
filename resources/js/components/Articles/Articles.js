import React from 'react';
import {observer} from "mobx-react";
import {Container, Box, ButtonGroup, Button} from '@material-ui/core';
import FreeStyle from "../Style/FreeStyle";
import User from "../Auth/Stores/User";
import Articles from "./Stores/Articles";
import OneArticle from "./OneArticle";
import {Alert} from '@material-ui/lab';

const ArticlesCmp = () => {

    const classes = FreeStyle();

    let loadArticles = (e) => {
        Articles.loading();
    }

    let articles = Articles.articles.map((element) => {
        return <OneArticle key={element.id_article} article={element}/>;
    });
    return (
        <Box component="main" className={classes.mainBlock}>
            <Container className={classes.centreBlock}>
                <Alert severity="error" className={!Articles.message ? classes.disabled : ''}>{Articles.message}</Alert>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button
                        type="submit"
                        disabled={!User.checkAuth}
                        variant="contained"
                        color="primary"
                        onClick={loadArticles}
                        className={classes.submit}
                    >
                        Загрузить статьи
                    </Button>
                </ButtonGroup>
                <Box className={classes.articlesContainerAll}>
                    {articles}
                </Box>
            </Container>
        </Box>
    );
}

export default observer(ArticlesCmp);
