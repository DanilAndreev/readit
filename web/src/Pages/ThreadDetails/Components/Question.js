import React from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../../Utilities/Auth";
import {coreRequest} from "../../../Utilities/Rest";

//MUI components
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

//MUI icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";


//Custom components
import ConfirmDialog from "../../../Utilities/Components/ConfirmDialog";

export default function Question({author, thread, onEdited = () => {}, ...props}) {
    const history = useHistory();
    const {user} = useAuth();
    const [edit, setEdit] = React.useState(false);
    const [newData, setNewData] = React.useState({title: thread.title, body: thread.body});
    const [deleteDialogOpened, setDeleteDialogOpened] = React.useState(false);
    const loading = false;

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
            .send(newData)
            .then(response => {
                console.log(response);
                setEdit(false);
                onEdited(newData);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleDelete() {
        setDeleteDialogOpened(false);
        coreRequest().delete(`questions/${thread.id}`)
            .then(response => {
                /*TODO: redirect to threads*/
            })
            .catch(error => {
                console.error(error);
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
            <ConfirmDialog
                open={deleteDialogOpened}
                onAccept={handleDelete}
                onCancel={() => setDeleteDialogOpened(false)}
            >
                Are you sure you want delete thread: {thread.title}
            </ConfirmDialog>
            <ListItem id={'author'}>
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={author.name}
                              secondary={`posted ${thread.created_at && new Date(thread.created_at).toLocaleString() || 'just now'}`}/>
                {user.id === author.id &&
                <ListItemSecondaryAction>
                    {!edit &&
                    <React.Fragment>
                        <IconButton onClick={event => setEdit(true)}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => setDeleteDialogOpened(true)}>
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
                    {thread.body}
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