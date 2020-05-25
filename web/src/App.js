/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev */
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {BaseTheme} from "./Themes/DefaultTheme";

//Providers
import {ThemeProvider} from "@material-ui/core/styles";
import {AuthProvider} from "./Utilities/Auth";
import {ConfirmDialogProvider} from "./Utilities/ConfirmDialog";

//Custom components
import Layout from "./Pages/Layout";


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ThemeProvider theme={BaseTheme}>
                    <ConfirmDialogProvider>
                        <Router>
                            <Layout/>
                        </Router>
                    </ConfirmDialogProvider>
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
