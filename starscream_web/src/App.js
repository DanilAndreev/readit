import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Layout from "./Pages/Layout";
import {ThemeProvider} from "@material-ui/core/styles";
import {BaseTheme} from "./Themes/DefaultTheme";


function App() {
    return (
        <Router>
            <div className="App">
                <ThemeProvider theme={BaseTheme}>
                    <Layout/>
                </ThemeProvider>
            </div>
        </Router>
    );
}

export default App;
