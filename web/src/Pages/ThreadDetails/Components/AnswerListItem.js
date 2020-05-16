import React from "react";
import {useAuth} from "../../../Utilities/Auth";
import {coreRequest} from "../../../Utilities/Rest";

//MUI components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

//MUI icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";


export default function AnswerListItem({answer, onEdited = () => {}, ...props}) {
    const {user} = useAuth();
    const [edit, setEdit] = React.useState(false);
    const [newData, setNewData] = React.useState(answer.text);

    React.useEffect(() => {
        setNewData(answer.text);
    }, [answer]);

    function handleDataInput(event) {
        setNewData(event.target.value);
    }

    function handleEditSubmit() {
        console.log(newData);
        coreRequest().put(`replies/${answer.id}`)
            .send({text: newData})
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
        coreRequest().delete(`replies/${answer.id}`)
            .then(response => {
                onEdited();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleCancelEdit(event) {
        setEdit(false);
        setNewData(answer.text);
    }

    const primary = (
        <React.Fragment>
            <Typography variant={'h6'}>
                {answer.user.name}
            </Typography>
            {!edit && answer.text}
            {edit &&
            <TextField
                fullWidth
                label={'Answer'}
                variant={'outlined'}
                size={"small"}
                multiline
                rows={4}
                onChange={handleDataInput}
                value={newData}
                required
            />
            }
        </React.Fragment>
    );

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={`posted ${new Date(answer.created_at).toLocaleString()}`}/>
                {user.id === answer.user.id &&
                <ListItemSecondaryAction>
                    {!edit &&
                    <React.Fragment>
                        <IconButton onClick={event => setEdit(true)}>
                            <EditIcon fontSize={"small"}/>
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon fontSize={"small"}/>
                        </IconButton>
                    </React.Fragment>
                    }
                    {edit &&
                    <React.Fragment>
                        <IconButton onClick={handleEditSubmit}>
                            <DoneIcon fontSize={"small"}/>
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                            <CloseIcon fontSize={"small"}/>
                        </IconButton>
                    </React.Fragment>
                    }
                </ListItemSecondaryAction>
                }
            </ListItem>
            <Divider/>
        </>
    );
}