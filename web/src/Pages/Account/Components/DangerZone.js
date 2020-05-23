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
import List from "@material-ui/core/List";

export default function DangerZone({viewed_user, updateInfo, ...props}) {
    const classes = useStyles();
    const {user, setUser, setToken, isAdmin} = useAuth();
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
                    } else {
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

    function handleMakeAdmin() {
        coreRequest().put(`users/${id}`)
            .send({is_admin: true})
            .then(response => {
                updateInfo();
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

    function handleTryMakeAdmin() {
        confirm(handleMakeAdmin, {
            title: `Make ${viewed_user.name} | ${viewed_user.email} admin?`,
            text: `This is a dangerous operation, admin can delete and edit threads, answers, and profiles. Also admin can make another users admin or remove admin`,
        });
    }

    function handleMakeNotAdmin() {
        coreRequest().put(`users/${id}`)
            .send({is_admin: false})
            .then(response => {
                updateInfo();
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

    function handleTryMakeNotAdmin() {
        confirm(handleMakeNotAdmin, {
            title: `Remove admin on ${viewed_user.name} | ${viewed_user.email}?`,
            text: `After removing admin user can not modify and delete threads, answers, users and manage admins`,
        });
    }

    return (
        <ListItem className={classes.dangerZone}>
            <FormControl fullWidth>
                <FormHelperText className={classes.dangerZone}>
                    Danger zone
                </FormHelperText>
                <List>
                    <ListItem className={classes.noPaddingSides}>
                        <Button
                            fullWidth
                            variant={'outlined'}
                            className={classes.dangerZone}
                            onClick={handleTryToDeleteAccount}
                        >
                            Delete account
                        </Button>
                    </ListItem>
                    {isAdmin() && viewed_user.id !== user.id &&
                    <React.Fragment>
                        {!viewed_user.is_admin &&
                        <ListItem className={classes.noPaddingSides}>
                            <Button
                                fullWidth
                                variant={'outlined'}
                                className={classes.dangerZone}
                                onClick={handleTryMakeAdmin}
                            >
                                Make admin
                            </Button>
                        </ListItem>
                        }
                        {viewed_user.is_admin &&
                        <ListItem className={classes.noPaddingSides}>
                            <Button
                                fullWidth
                                variant={'outlined'}
                                className={classes.dangerZone}
                                onClick={handleTryMakeNotAdmin}
                            >
                                Remove admin
                            </Button>
                        </ListItem>
                        }
                    </React.Fragment>
                    }
                </List>
            </FormControl>
        </ListItem>

    );
}