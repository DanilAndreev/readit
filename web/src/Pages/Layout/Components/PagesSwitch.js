/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev */
import React from "react";
import {useAuth} from "../../../Utilities/Auth";
import {Route, Switch} from "react-router-dom";

//Pages
import ThreadEditor from "../../ThreadEditor";
import Account from "../../Account";
import Users from "../../Users";
import ThreadsViewer from "../../ThreadsViewer";
import ThreadDetails from "../../ThreadDetails";
import About from "../../About";


export default function PagesSwitch({articles, setArticles, ...props}) {
    const {user} = useAuth();

    return (
        <Switch>
            <Route path={'/threads/:mode?'}>
                <ThreadsViewer articles={articles} setArticles={setArticles}/>
            </Route>
            <Route path={'/'} exact>
                <ThreadsViewer articles={articles} setArticles={setArticles}/>
            </Route>
            <Route path={'/thread/:id'}>
                <ThreadDetails/>
            </Route>
            {user &&
            <Route path={'/editthread/:id'}>
                <ThreadEditor/>
            </Route>
            }
            <Route path={'/user/:id'}>
                <Account/>
            </Route>
            <Route path={'/users'}>
                <Users/>
            </Route>
            <Route path={'/about'}>
                <About/>
            </Route>
        </Switch>

    );
}