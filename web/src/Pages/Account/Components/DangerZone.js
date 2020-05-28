/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from "react";
import {useAuth} from "../../../Utilities/Auth";
import {coreRequest} from "../../../Utilities/Rest";
import {useHistory, useParams} from 'react-router-dom';
import {useConfirmDialog} from "../../../Utilities/ConfirmDialog";
import useStyles from "./style";

//MUI components
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
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
            title: ` Ви впевнені, що хочете видалити акаунт: ${viewed_user.name}`,
            text: `Ця операція не може бути відмінена`,
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
            title: `Зробити ${viewed_user.name} | ${viewed_user.email} адміністратором?`,
            text: `Це опасна операція, адміністратор може видаляти питання, відповіді, і користувачів. Також адміністратор може повисити іншого користувача до адміністратора чи видалити його`,
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
            title: `Зняти з ролі адміністратора ${viewed_user.name} | ${viewed_user.email}?`,
            text: `Після зняття з ролі адміністратора користувач не зможе редагувати і видаляти питання, відповіді, користувачів і управляти адміністраторами.`,
        });
    }

    return (
        <ListItem className={classes.dangerZone}>
            <FormControl fullWidth>
                <FormHelperText className={classes.dangerZone}>
                    Небезпечна зона
                </FormHelperText>
                <List>
                    <ListItem className={classes.noPaddingSides}>
                        <Button
                            fullWidth
                            variant={'outlined'}
                            className={classes.dangerZone}
                            onClick={handleTryToDeleteAccount}
                        >
                            Видалити акаунт
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
                                Зробити адміністратором
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
                                Забрати адмінімтратора
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