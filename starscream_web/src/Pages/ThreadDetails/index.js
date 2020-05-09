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


export default function ThreadDetails() {
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

    function AnswerListItem({answer, ...props}) {
        const primary = (
            <>
                <Typography variant={'h6'}>
                    {answer.user}
                </Typography>
                {answer.answer}
            </>
        );

        return (
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={'posted 12.23.3212'}/>
            </ListItem>
        );
    }

    return (
        <Grid xs={12}>
            <Box>
                <List>
                    <ListItem id={'author'}>
                        <ListItemAvatar>
                            <Avatar>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={'Mikhail Kolesnikov'} secondary={'posted few days ago'}/>
                    </ListItem>
                    <ListItem id={'question'}>
                        <Typography variant={'h5'}>
                            Как сделать фото с закруглёнными краями определённого размера (высота и ширина 50px), но
                            чтобы картинка не растягивалась, если она не квадратная?
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography display={'block'}>
                            <Typography variant={'body1'}>
                                Нужна поддержка ie11
                                Как сверстать такой блок? Фотка может быть абсолютно разного размера. Пробую
                                border-radius: 50% и object-fit: cover
                                Но проблема в том, что object-fit не работает в ie11.
                            </Typography>
                        </Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem id={'answers'}>
                        <List>
                            {answers.map((item, index) => {
                                return (
                                    <>
                                        <AnswerListItem key={`answer_${index}`} answer={item}/>
                                        <Divider/>
                                    </>
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
                            <Grid item xs={0} md={10} />
                            <Grid item xs={12} md={2}>
                                <Button variant={'default'} fullWidth>
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