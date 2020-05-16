import React from 'react';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {coreRequest} from "../../Utilities/Rest";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import {useAuth} from "../../Utilities/Auth";


export default function Auth({
                                 authData,
                                 setAuthData,
                                 onComplete = () => {},
                                 ...props
                             }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState(null);
    const {setUser} = useAuth();

    function handleLogin() {
        coreRequest().post('auth/login')
            .send(authData)
            .then(response => {
                console.log(response);
                setUser(response.body.data);
                onComplete(response.body.data);
            })
            .catch(error => {
                const message = JSON.parse(error.message).message;
                switch (error.status) {
                    case 403:
                        setError(message);
                        break;
                    default:
                        setError('Unexpected error, see console for more information');
                        console.error(error);
                }
            });
    }

    function handleChangePassword(event) {
        event.persist();
        setAuthData(last => ({...last, password: event.target.value || null}))
    }

    function handleChangeEmail(event) {
        event.persist();
        setAuthData(last => ({...last, email: event.target.value || null}))
    }

    function handleChangeShowPassword(event) {
        setShowPassword(item => !item);
    }

    function handleRememberMe(event) {
        event.persist();
        setAuthData(last => ({...last, remember_me: event.target.checked || false}));
    }

    return (
        <List>
            {error && <ListItem>
                <Typography color={'error'} variant={'body2'}>
                    {error}
                </Typography>
            </ListItem>}
            <ListItem>
                <Input
                    placeholder={'Email'}
                    fullWidth
                    required
                    onChange={handleChangeEmail}
                    value={authData.email || ''}
                />
            </ListItem>
            <ListItem>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={authData.password || ''}
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
            </ListItem>
            <ListItem>
                <ListItemText primary={'Remember me'}/>
                <ListItemSecondaryAction>
                    <Checkbox checked={authData.remember_me} onChange={handleRememberMe}/>
                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <Button fullWidth onClick={handleLogin}>
                    Sign in
                </Button>
            </ListItem>
        </List>
    );
}