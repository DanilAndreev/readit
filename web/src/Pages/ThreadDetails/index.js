import React from 'react';
import {withWidth, isWidthUp} from "@material-ui/core";
import {coreRequest} from "../../Utilities/Rest";
import {useParams} from "react-router-dom";
import useStyles from "./style";
import {useAuth} from "../../Utilities/Auth";
import {useHistory} from 'react-router-dom';

//MUI components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";


//Custom components
import Question from './Components/Question'
import AnswerListItem from "./Components/AnswerListItem";
import ListItemText from "@material-ui/core/ListItemText";


function ThreadDetails({width, ...props}) {
    const [author, setAuthor] = React.useState({});
    const [thread, setThread] = React.useState({});
    const [answers, setAnswers] = React.useState([]);
    const [myAnswer, setMyAnswer] = React.useState('');
    const {id} = useParams();
    const {user} = useAuth();
    const classes = useStyles();
    const history = useHistory();

    function changeRoute(route) {
        history.push(route);
    }

    React.useEffect(() => {
        coreRequest().get(`questions/${id}`)
            .then(response => {
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

    function handleUpdateThread() {
        coreRequest().get(`questions/${id}`)
            .then(response => {
                setThread({...response.body.data, replies: undefined, user: undefined, user_id: undefined});
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
                setMyAnswer('');
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Grid item xs={12}>
            <Box p={1}>
                <List>
                    <ListItem>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" onClick={() => changeRoute('/threads')}>
                                Threads
                            </Link>
                            <Typography color="textPrimary">{thread.title}</Typography>
                        </Breadcrumbs>
                    </ListItem>
                    <Question author={author} thread={thread} onEdited={handleUpdateThread}/>
                    <Divider/>
                    <ListItem id={'answers'}>
                        <List className={classes.width100}>
                            {answers.map((item, index) => {
                                return (
                                    <AnswerListItem key={`answer_${index}`} answer={item} onEdited={handleUpdateAnswers}/>
                                );
                            })}
                        </List>
                    </ListItem>
                    {user &&
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
                    }
                    {!user &&
                    <ListItem>
                        <ListItemText
                            secondary={
                                <React.Fragment>
                                    <Link onClick={event => changeRoute('?login=true')}>
                                        Login
                                    </Link>
                                    &nbsp;or&nbsp;
                                    <Link onClick={event => changeRoute('?register=true')}>
                                        sign up
                                    </Link>
                                    &nbsp;to leave answers
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    }
                </List>
            </Box>
        </Grid>
    );
}

export default withWidth()(ThreadDetails);