import React from "react";
import {useParams} from 'react-router-dom'
import {coreRequest} from "../../../Utilities/Rest";
import {useAuth} from "../../../Utilities/Auth";
import useStyles from "./style";
import clsx from "clsx";

//MUI components
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

//MUI icons
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';


function useClientRect() {
    const [rect, setRect] = React.useState(null);
    const ref = React.useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}

export default function Info() {
    const [rect, ref] = useClientRect();
    const [editMode, setEditMode] = React.useState(false);
    const {id} = useParams();
    const [origUserdata, setOrigUserdata] = React.useState({
        name: '',
        email: '',
        interests: ''
    });
    const [userdata, setUserdata] = React.useState({
        name: '',
        email: '',
        interests: ''
    });
    const [connecting, setConnecting] = React.useState(true);
    const {user, setUser} = useAuth();
    const classes = useStyles();
    let loading = false;

    function init(pause = false) {
        pause && setConnecting(true);
        coreRequest().get(`users/${id}`)
            .then(response => {
                const data = {...response.body.data, id: undefined, interests: 'lol'};
                setOrigUserdata(data);
                setUserdata(data);
                pause && setConnecting(false);
            })
            .catch(error => {
                console.error(error);
                pause && setConnecting(false);
            });
    }

    React.useEffect(() => {
        loading = true;
        init(true);
    }, []);

    React.useEffect(() => {
        init(true);
    }, [id, user]);

    function handleEditSubmit() {
        coreRequest().put(`users/${id}`)
            .send(userdata)
            .then(response => {
                setUser(response.body.data);
                setEditMode(false);
                init();
            })
            .catch(error => {
                console.error(error);
            });
    }

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

   if (loading || connecting) {
       return null;
   }

    return (
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
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={'User info'}
                                secondary={`Last updated ${new Date(userdata.updated_at).toLocaleString() || 'recently'}`}
                                className={clsx(editMode && classes.listItemTextFix)}
                            />
                            {user && user.id === +id &&
                            <ListItemSecondaryAction>
                                {!editMode &&
                                <IconButton onClick={handleEdit}>
                                    <EditIcon fontSize={'small'}/>
                                </IconButton>
                                }
                                {editMode &&
                                <React.Fragment>
                                    <IconButton onClick={handleEditSubmit}>
                                        <DoneIcon fontSize={'small'}/>
                                    </IconButton>
                                    <IconButton onClick={handleCancel}>
                                        <CloseIcon fontSize={'small'}/>
                                    </IconButton>
                                </React.Fragment>
                                }
                            </ListItemSecondaryAction>
                            }
                        </ListItem>
                        <ListItem>
                            <TextField
                                disabled={!editMode}
                                fullWidth
                                name={'name'}
                                label={'Name'}
                                value={userdata.name}
                                onChange={handleDataInput}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                disabled={!editMode}
                                name={'email'}
                                fullWidth
                                label={'Email'}
                                value={userdata.email}
                                onChange={handleDataInput}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                disabled={!editMode}
                                name={'interests'}
                                fullWidth
                                label={'Interests'}
                                value={userdata.interests}
                                onChange={handleDataInput}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </ListItem>
    );
}