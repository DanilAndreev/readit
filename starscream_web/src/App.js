import React from 'react';
import logo from './logo.svg';
import './App.css';

import Grid from "@material-ui/core/Grid";

import ThreadsViewer from "./Pages/ThreadsViewer/ThreadsViewer";

function App() {
  return (
    <div className="App">
        <Grid container>
            <Grid xs={0} md={2} />
            <Grid xs={12} md={8} id={'page'}>
                <ThreadsViewer />
            </Grid>
            <Grid xs={0} md={2} />
        </Grid>
    </div>
  );
}

export default App;
