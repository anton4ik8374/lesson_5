import React from 'react';
import {observer} from "mobx-react";
import {Card, CardContent, Typography, CardActions, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import User from "../Auth/Stores/User";
import Articles from "./Stores/Articles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const OneArticle = ({article}) => {
    const classes = useStyles();
    let thisMyArticles = () =>{
        if(Number(User.user.userId) === Number(article.id_user)){
            return true;
        }
        return true;
    }
    let deleteArticle = (id) => {
        console.log(id);
        Articles.delete(id)
    }
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.pos} color="textSecondary">
                    {article.title}
                </Typography>
            </CardContent>
            {!thisMyArticles() && (<CardActions>
                <Button variant="outlined" color="secondary" onClick={() => deleteArticle(article.id_article)}>Удалить</Button>
            </CardActions>)}
        </Card>
    );
}

export default observer(OneArticle);
