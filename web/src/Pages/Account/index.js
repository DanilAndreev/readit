/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from 'react'
import {useAuth} from "../../Utilities/Auth";
import {useParams} from 'react-router-dom';
import {coreRequest} from "../../Utilities/Rest";
import {Helmet} from "react-helmet";

//MUI components
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

//Custom components
import Info from './Components/Info'
import Password from "./Components/Password";
import DangerZone from "./Components/DangerZone";


export default function Account() {
    const {user, isAdmin} = useAuth();
    const {id} = useParams();
    const [origUserdata, setOrigUserdata] = React.useState({
        name: '',
        email: '',
        interests: '',
        about_me: '',
    });
    const [connecting, setConnecting] = React.useState(true);
    let loading = false;

    function init(pause = false) {
        pause && setConnecting(true);
        coreRequest().get(`users/${id}`)
            .then(response => {
                const data = {...response.body.data, interests: 'lol'};
                setOrigUserdata(data);
                pause && setConnecting(false);
            })
            .catch(error => {
                console.error(error);
                pause && setConnecting(false);
            });
    }

    React.useEffect(() => {
        loading = true;
        init(true);
    }, []);

    React.useEffect(() => {
        init(true);
    }, [id, user]);

    if (loading || connecting) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <Helmet>
                <title>Readit | {origUserdata.name}</title>
            </Helmet>
            <List>
                <Info origUserdata={origUserdata} init={init}/>
                {user && user.id === +id &&
                <React.Fragment>
                    <Divider/>
                    <Password inputUser={origUserdata}/>
                </React.Fragment>
                }
                {(user && user.id === +id || isAdmin()) &&
                <React.Fragment>
                    <Divider/>
                    <DangerZone
                        viewed_user={origUserdata}
                        updateInfo={init}
                    />
                    <Divider/>
                </React.Fragment>
                }
            </List>
        </Grid>
    );
}