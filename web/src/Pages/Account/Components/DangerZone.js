import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import React from "react";
import useStyles from "./style";
import ConfirmDialog from "../../../Utilities/Components/ConfirmDialog";
import {useAuth} from "../../../Utilities/Auth";
import {coreRequest} from "../../../Utilities/Rest";
import {useHistory, useParams} from 'react-router-dom';

export default function DangerZone({viewed_user, ...props}) {
    const classes = useStyles();
    const [confirmDeleteAccountOpened, setConfirmDeleteAccountOpened] = React.useState(false);
    const {user, setUser, setToken} = useAuth();
    const {id} = useParams();
    const history = useHistory();

    function changeRoute(route) {
        history.push(route);
    }

    function handleDeleteAccount() {
        setConfirmDeleteAccountOpened(false);
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
                    console.log(error);
                });
        }
    }

    function handleCancelDeleteAccount() {
        setConfirmDeleteAccountOpened(false);
    }

    return (
        <ListItem className={classes.dangerZone}>
            <ConfirmDialog
                open={confirmDeleteAccountOpened}
                onCancel={handleCancelDeleteAccount}
                onAccept={handleDeleteAccount}
            >
                Are you sure you want delete account: {viewed_user.name}
            </ConfirmDialog>
            <FormControl fullWidth>
                <FormHelperText className={classes.dangerZone}>
                    Danger zone
                </FormHelperText>
                <Button
                    fullWidth
                    variant={'outlined'}
                    className={classes.dangerZone}
                    onClick={event => setConfirmDeleteAccountOpened(true)}
                >
                    Delete account
                </Button>
            </FormControl>
        </ListItem>

    );
}