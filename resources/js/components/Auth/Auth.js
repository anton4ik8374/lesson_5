import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react";
import User from "./Stores/User";
import loginStyles from "./style/loginStyle";
import {Typography, Box, TextField, Button, Paper} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import SkeletonMy from "../Helpers/SkeletonMy";

const Auth = () => {
    const classes = loginStyles();

    const [stateLogin, setLogin] = useState(User.token);
    const [statePassword, setPassword] = useState(User.password);

    useEffect(() => {
        User.Check();
    }, []);

    const inputChangeHandlerLogin = (event) => {
        let login = event.target.value;
        setLogin(login);
    };
    const inputChangeHandlerPassword = (event) => {
        let password = event.target.value;
        setPassword(password);
    };


    let login = (event) => {
        event.preventDefault();
        let data = {
            login: stateLogin,
            password: statePassword
        }

        User.Auth(data);
    }

    let logout = (event) => {
        User.logout();
    }


    return (
        User.loaded ?
        !User.checkAuth ?
            (<>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" className={classes.textHeader}>
                        ВХОД
                    </Typography>
                    <Box className={classes.containerForm}>
                        <Alert severity="error" className={!User.message ? classes.disabled : ''}>{User.message}</Alert>
                        <form className={classes.form} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={inputChangeHandlerLogin}
                                id="login"
                                label="Логин"
                                value={stateLogin}
                                name="login"
                                autoComplete="login"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                onChange={inputChangeHandlerPassword}
                                required
                                fullWidth
                                value={statePassword}
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={login}
                                className={classes.submit}
                            >
                                Авторизоваться
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </>)
            :
            (<Paper className={classes.paper}>
                <p>id: {User.user.userId}</p>
                <i>Name: {User.user.userName}</i>
                <Box className={classes.containerForm}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={logout}
                        className={classes.submit}
                    >
                        Выйти
                    </Button>
                </Box>
            </Paper>)
            :
            (<SkeletonMy/>)
    );
};

export default observer(Auth)
