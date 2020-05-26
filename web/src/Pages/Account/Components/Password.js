/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import Input from "@material-ui/core/Input";
import React from "react";
import {useHistory} from 'react-router-dom';

//MUI components
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

//MUI icons
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {coreRequest} from "../../../Utilities/Rest";


function ShowPasswordAdornment({handleClick, shown, name}) {
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={event => handleClick(event, name)}
            >
                {shown ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
        </InputAdornment>
    );
}

export default function Password({inputUser}) {
    const [showPassword, setShowPassword] = React.useState({
        oldpassword: false,
        newpassword: false,
        confirmnewpassword: false,
    });
    const [passwords, setPasswords] = React.useState({
        password: null,
        newpassword: null,
        confirmpassword: null
    });
    const [error, setError] = React.useState(null);
    const history = useHistory();

    function changeRoute(route) {
        history.push(route);
    }

    function handleShowPassword(event, name) {
        setShowPassword({...showPassword, [name]: !showPassword[name]})
    }

    function handleDataInput(event) {
        setPasswords({...passwords, [event.target.name] : event.target.value});
    }

    function checkFields() {
        let error = false;
        if (passwords.newpassword !== passwords.confirmpassword) {
            setError('Паролі не співпадають');
            error = true;
        }
        if (!passwords.newpassword || !passwords.confirmpassword || !passwords.password) {
            setError('Введіть пароль');
            error = true;
        }
        return error;
    }

    function handleChangePassword () {
        if (checkFields()) {
            return null;
        }

        coreRequest().put(`users/${inputUser.id}`)
            .send({old_password: passwords.password, password: passwords.newpassword})
            .then(response => {
                console.log(`Changed password for ${inputUser.name} | ${inputUser.email}`);
            })
            .catch(error => {
                switch (error.status) {
                    case 401:
                        changeRoute('?login=true');
                        break;
                    case 422:
                        setError('Некорректний пароль');
                        setPasswords({...passwords, password: null});
                    default:
                        console.error(error);
                }
            });
    }

    return (
        <ListItem>
            <FormControl fullWidth>
                <FormHelperText>
                    Change password
                </FormHelperText>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box p={1}>
                            <Input
                                required
                                name={'password'}
                                onChange={handleDataInput}
                                type={showPassword.oldpassword ? 'text' : 'password'}
                                fullWidth
                                placeholder={'Старий пароль'}
                                autoComplete={'password'}
                                endAdornment={
                                    <ShowPasswordAdornment
                                        handleClick={handleShowPassword}
                                        shown={showPassword.oldpassword}
                                        name={'oldpassword'}
                                    />
                                }
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box p={1}>
                            <Input
                                required
                                type={showPassword.newpassword ? 'text' : 'password'}
                                fullWidth
                                placeholder={'Новий пароль'}
                                autoComplete={'new-password'}
                                name={'newpassword'}
                                onChange={handleDataInput}
                                endAdornment={
                                    <ShowPasswordAdornment
                                        handleClick={handleShowPassword}
                                        shown={showPassword.newpassword}
                                        name={'newpassword'}
                                    />
                                }
                            />
                            <Input
                                name={'confirmpassword'}
                                onChange={handleDataInput}
                                required
                                type={showPassword.confirmnewpassword ? 'text' : 'password'}
                                fullWidth
                                placeholder={'Підтвердити новий пароль'}
                                autoComplete={'confirm-new-password'}
                                endAdornment={
                                    <ShowPasswordAdornment
                                        handleClick={handleShowPassword}
                                        shown={showPassword.confirmnewpassword}
                                        name={'confirmnewpassword'}
                                    />
                                }
                            />
                        </Box>
                    </Grid>
                    <FormHelperText error>{error}</FormHelperText>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant={'outlined'}
                            onClick={handleChangePassword}
                        >
                            Змінити пароль
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </ListItem>
    );
}