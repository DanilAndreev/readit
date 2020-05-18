import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import React from "react";
import useStyles from "./style";
import {useAuth} from "../../../Utilities/Auth";
import {coreRequest} from "../../../Utilities/Rest";
import {useHistory, useParams} from 'react-router-dom';
import {useConfirmDialog} from "../../../Utilities/ConfirmDialog";

export default function DangerZone({viewed_user, ...props}) {
    const classes = useStyles();
    const {user, setUser, setToken} = useAuth();
    const {id} = useParams();
    const history = useHistory();
    const confirm = useConfirmDialog();

    function changeRoute(route) {
        history.push(route);
    }

    function handleDeleteAccount() {
        if (user) {
            coreRequest().delete(`users/${id}`)
                .then(response => {
                    if (user.id == id) {
                        setUser(null);
                        setToken(null);
                        changeRoute('/threads');
                    }else{
                        changeRoute('/users');
                    }
                })
                .catch(error => {
                    switch (error.status) {
                        case 401:
                            changeRoute('?login=true');
                            break;
                        default:
                            console.error(error);
                    }
                });
        }
    }


    function handleTryToDeleteAccount() {
        confirm(handleDeleteAccount, {
            title: ` Are you sure you want delete account: ${viewed_user.name}`,
            text: `This operation cannot be undone`,
        })
    }

    return (
        <ListItem className={classes.dangerZone}>
            <FormControl fullWidth>
                <FormHelperText className={classes.dangerZone}>
                    Danger zone
                </FormHelperText>
                <Button
                    fullWidth
                    variant={'outlined'}
                    className={classes.dangerZone}
                    onClick={handleTryToDeleteAccount}
                >
                    Delete account
                </Button>
            </FormControl>
        </ListItem>

    );
}