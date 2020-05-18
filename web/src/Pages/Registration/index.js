import React from 'react';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import {coreRequest} from "../../Utilities/Rest";
import {useAuth} from "../../Utilities/Auth";
import {useHistory} from 'react-router-dom';
import FormHelperText from "@material-ui/core/FormHelperText";
import ListItemText from "@material-ui/core/ListItemText";


export default function Registration({authData, setAuthData, onComplete, ...props}) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({username: null, password: null, email: null});
    const {setUser} = useAuth();
    const history = useHistory();
    const [errors, setErrors] = React.useState({username: null, email: null, password: null, repeatpassword: null});

    function changeRoute(route) {
        history.push(route);
    }

    function handleChangePassword(event) {
        event.persist();
        setData(last => ({...last, password: event.target.value || null}));
    }

    function handleChangeData(event) {
        event.persist();
        setData(last => ({...last, [event.target.name]: event.target.value || null}))
    }

    function handleChangeShowPassword(event) {
        setShowPassword(item => !item);
    }

    function handleRegisterError(error) {
        setErrors({username: null, email: null, password: null, repeatpassword: null});
        switch (error.status) {
            case 422:
                const errors = error.response.body.errors;
                for (const key in errors) {
                    let message = 'Unresolved error';
                    const error = errors[key][0];
                    if (error) {
                        switch (error) {
                            case 'validation.email':
                                message = 'Incorrect email';
                                break;
                            case 'validation.min.string':
                                message = 'Password is too short';
                                break;
                            case 'validation.unique':
                                message = 'Username is already taken';
                                break;
                        }
                        setErrors(last => ({...last, [key]: message}));
                    }
                }
                break;
            default:
        }
    }

    function handleRegister() {
        coreRequest().post('auth/register')
            .send({...data, password_confirmation: data.password, name: data.username, username: undefined})
            .then(response => {
                setUser(response.body.data);
                changeRoute(`/user/${response.body.data.id}`);
                onComplete();
            })
            .catch(error => {
                console.error(error);
                handleRegisterError(error);
            });
    }

    return (
        <List>
            <ListItem>
                <ListItemText
                    primary={
                        <Input
                            placeholder={'Username'}
                            fullWidth
                            required
                            name={'username'}
                            onChange={handleChangeData}
                            value={data.username || ''}
                        />
                    }
                    secondary={errors.username && <FormHelperText error> {errors.username} </FormHelperText>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={
                        <Input
                            placeholder={'Email'}
                            fullWidth
                            required
                            name={'email'}
                            onChange={handleChangeData}
                            value={data.email || ''}
                        />
                    }
                    secondary={errors.email && <FormHelperText error> {errors.email} </FormHelperText>}
                />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary={
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password || ''}
                            placeholder={'Password'}
                            onChange={handleChangePassword}
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleChangeShowPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    }
                    secondary={errors.password && <FormHelperText error> {errors.password} </FormHelperText>}
                />

            </ListItem>
            <ListItem>
                <Button fullWidth onClick={handleRegister}>
                    Sign up
                </Button>
            </ListItem>
        </List>
    );
}