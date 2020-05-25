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
import useStyles from "./style";
import Paper from "@material-ui/core/Paper";


export default function Auth({
                                 authData,
                                 setAuthData,
                                 onComplete = () => {
                                 },
                                 ...props
                             }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [data, setData] = React.useState({email: null, password: null, remember: false});
    const {setUser} = useAuth();
    const classes = useStyles();

    if (!authData) {
        authData = data;
        setAuthData = setData;
    }

    function handleLogin() {
        if (!authData.email || !authData.password) {
            setError('Credential cannot be empty');
            return;
        }

        coreRequest().post('auth/login')
            .send(authData)
            .then(response => {
                setUser(response.body.data);
                onComplete(response.body.data);
            })
            .catch(error => {
                console.error(error);
                try {
                    switch (error.status) {
                        case 403:
                            setError('Вже аутентифіковано');
                            break;
                        case 422:
                            setError('Неправильна пошта чи пароль');
                            break;
                        default:
                            setError('Unexpected error, see console for more information');
                            console.error(error);
                    }
                } catch (err) {
                    console.error(err);
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
        setAuthData(last => ({...last, remember: event.target.checked || false}));
    }

    return (
        <Paper className={classes.paper}>
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
                        autoComplete={'email'}
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
                        autoComplete={'password'}
                        fullWidth
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
                    <ListItemText primary={'Запам\'ятати мене'}/>
                    <ListItemSecondaryAction>
                        <Checkbox checked={authData.remember} onChange={handleRememberMe}/>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <Button fullWidth onClick={handleLogin}>
                        Увійти
                    </Button>
                </ListItem>
            </List>
        </Paper>
    );
}