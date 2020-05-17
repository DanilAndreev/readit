import React from 'react'
import {useAuth} from "../../Utilities/Auth";
import {useParams} from 'react-router-dom';

//MUI components
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

//Custom components
import Info from './Components/Info'
import Password from "./Components/Password";
import DangerZone from "./Components/DangerZone";


export default function Account() {
    const {user} = useAuth();
    const {id} = useParams();

    return (
        <Grid item xs={12}>
            <List>
                <Info/>
                {user && user.id === +id &&
                <React.Fragment>
                    <Divider/>
                    <Password />
                    <Divider/>
                    <DangerZone/>
                    <Divider/>
                </React.Fragment>
                }
            </List>
        </Grid>
    );
}