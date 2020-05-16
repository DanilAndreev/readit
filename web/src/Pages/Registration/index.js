import React from 'react';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import {coreRequest} from "../../Utilities/Rest";


export default function Registration({authData, setAuthData, ...props}) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({username: null, password: null, email: null});

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

    function handleRegister() {
        coreRequest().post('auth/register')
            .send({...data, password_confirmation: data.password, name: data.username, username: undefined})
            .then(response => {

            })
            .catch(console.error);
    }

    return (
        <List>
            <ListItem>
                <Input
                    placeholder={'Username'}
                    fullWidth
                    required
                    name={'username'}
                    onChange={handleChangeData}
                    value={data.username || ''}
                />
            </ListItem>
            <ListItem>
                <Input
                    placeholder={'Email'}
                    fullWidth
                    required
                    name={'email'}
                    onChange={handleChangeData}
                    value={data.email || ''}
                />
            </ListItem>
            <ListItem>
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
            </ListItem>
            <ListItem>
                <Button fullWidth onClick={handleRegister}>
                    Sign up
                </Button>
            </ListItem>
        </List>
    );
}