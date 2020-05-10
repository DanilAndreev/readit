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

export function Question({author, thread, ...props}) {
    return (
        <>
            <ListItem id={'author'}>
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={author.username} secondary={`posted ${thread.date || 'just now'}`}/>
            </ListItem>
            <ListItem id={'question'}>
                <Typography variant={'h5'}>
                    {thread.summary}
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant={'body1'}>
                    {thread.description}
                </Typography>
            </ListItem>
        </>
    );
}

function AnswerListItem({answer, ...props}) {
    const primary = (
        <React.Fragment>
            <Typography variant={'h6'}>
                {answer.user}
            </Typography>
            {answer.answer}
        </React.Fragment>
    );

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={'posted 12.23.3212'}/>
            </ListItem>
            <Divider/>
        </>
    );
}

function ThreadDetails({width, ...props}) {
    const answers = [
        {
            answer: 'svg берите и это будет работать там где html5 не поддерживается',
            date: '12.32.4323',
            user: 'Максим Ленский'
        },
        {
            answer: 'Попробовать накинуть background-size: cover; почему нет?',
            date: '04.24.1212',
            user: 'Andrew Kolomiets'
        },
        {
            answer: 'Не понимаю о чём ты, но, если что можно так настраивать каждый угол: border-radius: 13em 0.5em/1em 0.5em; border-radius: 50px/25px 0 0 50px/25px;',
            date: '04.24.1212',
            user: 'Qeuvec'
        },
    ];

    const author = {username: 'Mikhail Kolesnikov'}
    const thread = {
        date: '12.23.1232',
        summary: 'Как сделать фото с закруглёнными краями определённого размера (высота и ширина 50px), но чтобы картинка не растягивалась, если она не квадратная?',
        description: 'Нужна поддержка ie11 Как сверстать такой блок? Фотка может быть абсолютно разного размера. Пробую border-radius: 50% и object-fit: cover Но проблема в том, что object-fit не работает в ie11.',
    };

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
                                    multiline
                                    rows={8}
                                    variant={'outlined'}
                                    label={'Answer'}
                                    fullWidth
                                />
                            </Grid>
                            {isWidthUp('sm', width) && <Grid item md={10}/>}
                            <Grid item xs={12} md={2}>
                                <Button fullWidth>
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