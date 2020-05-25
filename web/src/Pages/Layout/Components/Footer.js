import Grid from "@material-ui/core/Grid";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import {useHistory} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import {BaseTheme} from "../../../Themes/DefaultTheme";
import {ThemeProvider} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import useStyles from "./style";

export default function Footer() {
    const history = useHistory();
    const classes = useStyles();

    function changeRoute(route) {
        history.push(route);
    }

    return (
        <Grid item xs={12}>
            <ThemeProvider theme={BaseTheme}>
                <Box p={2} className={classes.footer}>
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <List>
                                <ListItem>
                                    Розробники
                                </ListItem>
                                <ListItem>
                                    <Link href={'#'} onClick={event => changeRoute(`/user/13`)}>
                                        Андрєєв Данило
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={'#'} onClick={event => changeRoute(`/user/19`)}>
                                        Соломаха Олександр
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={'#'} onClick={event => changeRoute(`/user/25`)}>
                                        Нєстєров Микита
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <List>
                                <ListItem>
                                    Розділи
                                </ListItem>
                                <ListItem>
                                    <Link href={'#'} onClick={event => changeRoute(`/threads`)}>
                                        Питання
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={'#'} onClick={event => changeRoute(`/users`)}>
                                        Користувачі
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={'#'} onClick={event => changeRoute(`/editthread/new`)}>
                                        Створити питання
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <List>
                                <ListItem>
                                    Використані технології
                                </ListItem>
                                <ListItem>
                                    <Link href={'https://reactjs.org/'}>
                                        React
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={'https://material-ui.com/'}>
                                        Material UI
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={'https://laravel.com/'}>
                                        Laravel
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <List>
                                <ListItem>
                                    Розробка
                                </ListItem>
                                <ListItem>
                                    <Link href={'https://github.com/DanilAndreev/starscream_project'}>
                                        Github репозиторій
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link href={'https://github.com/DanilAndreev/starscream_project/tree/master/web'}>
                                        Github репозиторій front-end
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        href={'https://github.com/DanilAndreev/starscream_project/tree/master/backend'}>
                                        Github репозиторій back-end
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container className={classes.copyright}>
                    <Box p={2}>
                        <Grid item xs={12}>
                            <Typography variant={'subtitle2'} align={'center'}>
                                Copyright (С) Andrieiev Solomaha Nesterov 2019 All rights reserved
                            </Typography>
                        </Grid>
                    </Box>
                </Grid>
            </ThemeProvider>
        </Grid>
    );
}