import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";


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

export default function Password() {
    const [showPassword, setShowPassword] = React.useState({
        oldpassword: false,
        newpassword: false,
        confirmnewpassword: false,
    });

    function handleShowPassword(event, name) {
        setShowPassword({...showPassword, [name]: !showPassword[name]})
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
                                endAdornment={
                                    <ShowPasswordAdornment
                                        handleClick={handleShowPassword}
                                        shown={showPassword.newpassword}
                                        name={'newpassword'}
                                    />
                                }
                            />
                            <Input
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
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant={'outlined'}
                        >
                            Змінити пароль
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </ListItem>
    );
}