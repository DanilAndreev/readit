import React from 'react'
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from '@material-ui/core/CardMedia';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from "@material-ui/core/Input";
import useStyles from "./style";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

function useClientRect() {
    const [rect, setRect] = React.useState(null);
    const ref = React.useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}

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


export default function Account() {
    const [rect, ref] = useClientRect();
    const classes = useStyles();

    const [origUserdata, setOrigUserdata] = React.useState({
        name: 'Danil Andreev',
        email: 'danssg08@gmail.com',
        interests: 'CGI'
    });
    const [userdata, setUserdata] = React.useState({
        name: 'Danil Andreev',
        email: 'danssg08@gmail.com',
        interests: 'CGI'
    });
    const [editMode, setEditMode] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState({
        oldpassword: false,
        newpassword: false,
        confirmnewpassword: false,
    });

    function handleEdit() {
        setEditMode(true);
    }

    function handleCancel() {
        setUserdata(origUserdata);
        setEditMode(false);
    }

    function handleDataInput(event) {
        setUserdata({...userdata, [event.target.name]: event.target.value});
    }

    function handleShowPassword(event, name) {
        setShowPassword({...showPassword, [name]: !showPassword[name]})
    }

    return (
        <Grid item xs={12}>
            <List>
                <ListItem>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Box p={1}>
                                <Avatar
                                    ref={ref}
                                    style={{width: '100%', height: rect && rect.width}}
                                >
                                </Avatar>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box p={1}>
                                <TextField
                                    disabled={!editMode}
                                    fullWidth
                                    name={'name'}
                                    label={'Name'}
                                    value={userdata.name}
                                    onChange={handleDataInput}
                                />
                                <TextField
                                    disabled={!editMode}
                                    name={'email'}
                                    fullWidth
                                    label={'Email'}
                                    value={userdata.email}
                                    onChange={handleDataInput}
                                />
                                <TextField
                                    disabled={!editMode}
                                    name={'interests'}
                                    fullWidth
                                    label={'Interests'}
                                    value={userdata.interests}
                                    onChange={handleDataInput}
                                />
                            </Box>
                        </Grid>
                        {!editMode && <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant={'outlined'}
                                onClick={handleEdit}
                            >
                                EDIT
                            </Button>
                        </Grid>}
                        {editMode && <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant={'outlined'}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>}
                        {editMode && <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant={'outlined'}
                            >
                                Save
                            </Button>
                        </Grid>}
                    </Grid>
                </ListItem>
                <Divider/>
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
                                        placeholder={'Old password'}
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
                                        placeholder={'New password'}
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
                                        placeholder={'Confirm new password'}
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
                                    Change password
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </ListItem>
                <Divider/>
                <ListItem className={classes.dangerZone}>
                    <FormControl fullWidth>
                        <FormHelperText className={classes.dangerZone}>
                            Danger zone
                        </FormHelperText>
                        <Button
                            fullWidth
                            variant={'outlined'}
                            className={classes.dangerZone}
                        >
                            Delete account
                        </Button>
                    </FormControl>
                </ListItem>
                <Divider/>
            </List>
        </Grid>
    );
}