import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Layout from "./Pages/Layout";
import {ThemeProvider} from "@material-ui/core/styles";
import {BaseTheme} from "./Themes/DefaultTheme";
import {AuthProvider} from "./Utilities/Auth";


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ThemeProvider theme={BaseTheme}>
                    <Router>
                        <Layout/>
                    </Router>
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
