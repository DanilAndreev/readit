import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useAuth} from "../../../Utilities/Auth";
import {coreRequest} from "../../../Utilities/Rest";
import {useConfirmDialog} from '../../../Utilities/ConfirmDialog'

//MUI components
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

//MUI icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";


//Custom components
import ParsedMessage from "../../../Utilities/Components/ParsedMessage";

export default function Question({
                                     author, thread, onEdited = () => {
    }, ...props
                                 }) {
    const history = useHistory();
    const {user, isAdmin} = useAuth();
    const [edit, setEdit] = React.useState(false);
    const [newData, setNewData] = React.useState({title: thread.title, body: thread.body});
    const loading = false;
    const confirm = useConfirmDialog();

    React.useEffect(() => {
        setNewData({title: thread.title, body: thread.body});
    }, [thread]);

    function changeRoute(route) {
        history.push(route);
    }

    function handleDataInput(event) {
        setNewData({...newData, [event.target.name]: event.target.value});
    }

    function handleEditSubmit() {
        coreRequest().put(`questions/${thread.id}`)
            .send({...newData, body: newData.body.replace(/(\n\n\n)+/g, '\n'), title: newData.title.replace(/\n/g, '')})
            .then(response => {
                console.log(response);
                setEdit(false);
                onEdited(newData);
            })
            .catch(error => {
                switch (error.status) {
                    case 401:
                        changeRoute('?login=true');
                        break;
                    default:
                        console.error(error);
                }
            });
    }

    function handleTryToDelete() {
        confirm(handleDelete, {
            title: `Are you sure you want delete thread: ${thread.title}`,
            text: 'This operation cannot be undone'
        });
    }

    function handleDelete() {
        coreRequest().delete(`questions/${thread.id}`)
            .then(response => {
                changeRoute('/threads');
            })
            .catch(error => {
                switch (error.status) {
                    case 401:
                        changeRoute('?login=true');
                        break;
                    default:
                        console.error(error);
                }
            });
    }

    function handleCancelEdit(event) {
        setEdit(false);
        setNewData({title: thread.title, body: thread.body});
    }

    if (loading) {
        return null;
    }

    return (
        <>
            <ListItem id={'author'}>
                <ListItemAvatar>
                    <Avatar
                        src={`${process.env.REACT_APP_CORE_AVATARS}/${author.id}.jpg`}
                    >
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={author.name}
                              secondary={`posted ${thread.created_at && new Date(thread.created_at).toLocaleString() || 'just now'}`}/>
                {(user && user.id === author.id || isAdmin()) &&
                <ListItemSecondaryAction>
                    {!edit &&
                    <React.Fragment>
                        <IconButton onClick={event => setEdit(true)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={handleTryToDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </React.Fragment>
                    }
                    {edit &&
                    <React.Fragment>
                        <IconButton onClick={handleEditSubmit}>
                            <DoneIcon/>
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                            <CloseIcon/>
                        </IconButton>
                    </React.Fragment>
                    }
                </ListItemSecondaryAction>
                }
            </ListItem>
            <ListItem id={'question'}>
                {!edit &&
                <Typography variant={'h5'}>
                    {thread.title}
                </Typography>
                }
                {edit &&
                <TextField
                    fullWidth
                    label={'Summary'}
                    required
                    value={newData.title}
                    name={'title'}
                    variant={'outlined'}
                    onChange={handleDataInput}
                />
                }
            </ListItem>
            <ListItem>
                {!edit &&
                <Typography variant={'body1'}>
                    {thread.body && <ParsedMessage message={thread.body} style={{whiteSpace: 'pre-wrap'}}/>}
                </Typography>
                }
                {edit &&
                <TextField
                    fullWidth
                    label={'Description'}
                    required
                    value={newData.body}
                    name={'body'}
                    variant={'outlined'}
                    size={"small"}
                    onChange={handleDataInput}
                    multiline
                    rows={6}
                />
                }
            </ListItem>
        </>
    );
}