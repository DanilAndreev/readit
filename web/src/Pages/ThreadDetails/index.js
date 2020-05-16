import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withWidth, isWidthUp} from "@material-ui/core";
import {coreRequest} from "../../Utilities/Rest";
import {useParams} from "react-router-dom";

export function Question({author, thread, ...props}) {
    return (
        <>
            <ListItem id={'author'}>
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={author.name} secondary={`posted ${new Date(thread.created_at).toLocaleString() || 'just now'}`}/>
            </ListItem>
            <ListItem id={'question'}>
                <Typography variant={'h5'}>
                    {thread.title}
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant={'body1'}>
                    {thread.body}
                </Typography>
            </ListItem>
        </>
    );
}

function AnswerListItem({answer, ...props}) {
    const primary = (
        <React.Fragment>
            <Typography variant={'h6'}>
                {answer.user.name}
            </Typography>
            {answer.text}
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
            </ListItem>
            <Divider/>
        </>
    );
}

function ThreadDetails({width, ...props}) {
    const [author, setAuthor] = React.useState({});
    const [thread, setThread] = React.useState({});
    const [answers, setAnswers] = React.useState([]);
    const [myAnswer, setMyAnswer] = React.useState('');
    const {id} = useParams();

    React.useEffect(() => {
        coreRequest().get(`questions/${id}`)
            .then(response => {
                console.log(response);
                setAuthor(response.body.data.user);
                setThread({...response.body.data, replies: undefined, user: undefined, user_id: undefined});
                setAnswers(response.body.data.replies);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function handleUpdateAnswers() {
        coreRequest().get(`questions/${id}/replies`)
            .then(response => {
                setAnswers(response.body.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleInputAnswer(event) {
        setMyAnswer(event.target.value);
    }

    function handleAnswer() {
        coreRequest().post(`questions/${id}/replies`)
            .send({text: myAnswer})
            .then(response => {
                handleUpdateAnswers();
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Grid item xs={12}>
            <Box p={1}>
                <List>
                    <Question author={author} thread={thread}/>
                    <Divider/>
                    <ListItem id={'answers'}>
                        <List>
                            {answers.map((item, index) => {
                                return (
                                    <AnswerListItem key={`answer_${index}`} answer={item}/>
                                );
                            })}
                        </List>
                    </ListItem>
                    <ListItem id={'compose'}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    value={myAnswer}
                                    multiline
                                    rows={8}
                                    variant={'outlined'}
                                    label={'Answer'}
                                    fullWidth
                                    onChange={handleInputAnswer}
                                />
                            </Grid>
                            {isWidthUp('sm', width) && <Grid item md={10}/>}
                            <Grid item xs={12} md={2}>
                                <Button fullWidth onClick={handleAnswer}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Box>
        </Grid>
    );
}

export default withWidth()(ThreadDetails);