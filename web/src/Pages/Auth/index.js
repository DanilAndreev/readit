import React from 'react';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import {coreRequest} from "../../Utilities/Rest";


export default function Auth({authData, setAuthData, ...props}) {
    const [showPassword, setShowPassword] = React.useState(false);

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

    function handleLogin() {
        const host = `${process.env.REACT_APP_CORE_URL}/auth/login`;
        coreRequest().post('auth/login')
            .send(authData)
            .then(console.log)
            .catch(error => {});
    }

    return (
        <List>
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
                <Button fullWidth onClick={handleLogin}>
                    Sign in
                </Button>
            </ListItem>
        </List>
    );
}