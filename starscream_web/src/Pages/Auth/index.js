import React from 'react';
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";


export default function Auth({authData, setAuthData, ...props}) {
    const [showPassword, setShowPassword] = React.useState(false);

    function handleChangePassword(event) {
        setAuthData(last => ({...last, password: event.target.value || null}))
    }
    function handleChangeUsername(event) {
        setAuthData(last => ({...last, username: event.target.value || null}))
    }

    function handleChangeShowPassword(event) {
        setShowPassword(item => !item);
    }

    return (
        <List>
            <ListItem>
                <Input
                    placeholder={'Username or email'}
                    fullWidth
                    required
                    onChange={handleChangeUsername}
                />
            </ListItem>
            <ListItem>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={authData.password}
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
                <Button fullWidth>
                    Sign in
                </Button>
            </ListItem>
        </List>
    );
}