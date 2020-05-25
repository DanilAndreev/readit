import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import {useAuth} from "../../../Utilities/Auth";
import {coreRequest} from "../../../Utilities/Rest";
import {useConfirmDialog} from '../../../Utilities/ConfirmDialog'
import useStyles from "./style";
import clsx from "clsx";

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
                                     author,
                                     thread,
                                     onEdited = () => {
                                     },
                                     preview = false,
                                     ...props
                                 }) {
    const history = useHistory();
    const {user, isAdmin} = useAuth();
    const [edit, setEdit] = React.useState(false);
    const [newData, setNewData] = React.useState({title: thread.title, body: thread.body});
    const loading = false;
    const confirm = useConfirmDialog();
    const classes = useStyles();
    const [errors, setErrors] = React.useState({title: null, body: null});

    React.useEffect(() => {
        setNewData({title: thread.title, body: thread.body});
    }, [thread]);

    function changeRoute(route) {
        history.push(route);
    }

    function handleDataInput(event) {
        setNewData({...newData, [event.target.name]: event.target.value});
    }

    function checkFields() {
        let isError = false;
        if (!newData.body) {
            setErrors(last => ({...last, body: 'Заповніть обов\'язкове поле'}));
            isError = true;
        } else {
            setErrors(last => ({...last, body: null}));
        }
        if(!newData.title){
            setErrors(last => ({...last, title: 'Заповніть обов\'язкове поле'}));
            isError = true;
        } else {
            setErrors(last => ({...last, title: null}));
        }
        return !isError;
    }

    function handleEditSubmit() {
        if (!checkFields()) {
            return null;
        }

        coreRequest().put(`questions/${thread.id}`)
            .send({...newData, body: newData.body.replace(/(\n\n\n)+/g, '\n'), title: newData.title.replace(/\n/g, '')})
            .then(response => {
                console.log(response);
                setEdit(false);
                onEdited(newData);
                setErrors({title: null, body: null});
            })
            .catch(error => {
                switch (error.status) {
                    case 401:
                        changeRoute('?login=true');
                        break;
                    default:
                        setErrors({title: 'Error', body: 'Error'});
                }
            });
    }

    function handleTryToDelete() {
        confirm(handleDelete, {
            title: `Ви впевнені, що хочете видалити питання: ${thread.title}`,
            text: 'Ця операція не може бути відмінена'
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
            <ListItem id={'author'} button onClick={event => changeRoute(`/user/${author.id}`)}>
                <ListItemAvatar>
                    <Avatar
                        src={`${process.env.REACT_APP_CORE_AVATARS}/${author.id}.jpg`}
                    >
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={author.name}
                    secondary={`опубліковано ${thread.created_at && new Date(thread.created_at).toLocaleString() || 'тільки що'}`}
                    className={clsx((user && user.id === author.id || isAdmin()) && classes.listItemTextFix)}
                />
                {(user && user.id === author.id || isAdmin()) && !preview &&
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
                    helperText={errors.title}
                    fullWidth
                    label={'Питання'}
                    required
                    value={newData.title}
                    name={'title'}
                    variant={'outlined'}
                    onChange={handleDataInput}
                    error={errors.title}
                />
                }
            </ListItem>
            <ListItem>
                {!edit &&
                <Typography variant={'body1'}>
                    {thread.body &&
                    <Typography style={{whiteSpace: 'pre-wrap'}}>
                        <ParsedMessage message={thread.body} style={{whiteSpace: 'pre-wrap'}}/>
                    </Typography>
                    }
                </Typography>
                }
                {edit &&
                <TextField
                    fullWidth
                    label={'Детально'}
                    helperText={errors.body}
                    required
                    value={newData.body}
                    name={'body'}
                    variant={'outlined'}
                    size={"small"}
                    onChange={handleDataInput}
                    multiline
                    rows={6}
                    error={errors.body}
                />
                }
            </ListItem>
        </>
    );
}