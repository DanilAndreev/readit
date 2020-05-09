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

import { BaseTheme } from './Themes/DefaultTheme'
import {ThemeProvider} from '@material-ui/core/styles';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


function App() {
    const classes = useStyles();
    return (
        <Router>
            <div className="App">
                <ThemeProvider theme={BaseTheme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Forum
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container>
                        <Grid item xs={0} md={2}/>
                        <Grid item xs={12} md={8} id={'page'}>
                            <Switch>
                                <Route path={'/threads'}>
                                    <ThreadsViewer/>
                                </Route>
                            </Switch>
                        </Grid>
                        <Grid item xs={0} md={2}/>
                    </Grid>
                </ThemeProvider>
            </div>
        </Router>
    );
}

export default App;
