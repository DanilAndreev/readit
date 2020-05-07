import React from 'react';
import logo from './logo.svg';

import Grid from "@material-ui/core/Grid";

import ThreadsViewer from "./Pages/ThreadsViewer/ThreadsViewer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from "./style";

import DefaultTheme from './Themes/DefaultTheme'
import {ThemeProvider} from '@material-ui/core/styles';



function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <ThemeProvider theme={DefaultTheme}>
                <AppBar position="static" className={classes.header}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Grid item xs={0} md={2}/>
                    <Grid item xs={12} md={8} id={'page'}>
                        <ThreadsViewer/>
                    </Grid>
                    <Grid item xs={0} md={2}/>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default App;
