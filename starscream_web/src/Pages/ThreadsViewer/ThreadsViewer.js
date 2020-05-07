import React from 'react'
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

function ThreadListItem({thread, ...props}) {
    const primary = (
        <Typography>
            {thread.title}
        </Typography>
    );
    const secondary = (
        <>
            {`${thread.answers} answers`}
        </>
    );

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary}/>
            </ListItem>
            <Divider/>
        </>
    );
}


export default function ThreadViewer() {
    const topArticles = [
        {title: 'Какие книги читать по python для продолжение изучения?\n', answers: 4},
        {title: 'Как добавлять текст к input?', answers: 2},
        {title: 'Какой монитор на IPS матрице выбрать?', answers: 8},
        {title: 'Как устроена андроид разработка по аналогии с веб фронтенд разработкой?', answers: 4},
        {title: 'Что не так с кодом ютуба?', answers: 10}
    ];

    const articles = [
        {title: 'Какие книги читать по python для продолжение изучения?\n', answers: 4, views: 100},
        {title: 'Как добавлять текст к input?', answers: 2, views: 200},
        {title: 'Какой монитор на IPS матрице выбрать?', answers: 8, views: 134},
        {title: 'Как устроена андроид разработка по аналогии с веб фронтенд разработкой?', answers: 4, views: 2834},
        {title: 'Что не так с кодом ютуба?', answers: 10, views: 123}
    ];

    return (
        <Box>
            <Grid container>
                <Grid md={2}>

                </Grid>
                <Grid md={7}>
                    <Box p={1}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={'Find question'}
                            size={'small'}
                        />
                    </Box>
                </Grid>
                <Grid md={3}>
                    <Box p={1}>
                        <Button
                            variant="outlined"
                            fullWidth
                        >
                            Create thread
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid md={2}>
                    <Box p={1}>
                        <List>
                            <Divider/>
                            <ListItem dense button>
                                <ListItemText primary={"All threads"}/>
                            </ListItem>
                            <ListItem dense button>
                                <ListItemText primary={"My threads"}/>
                            </ListItem>
                            <ListItem dense button>
                                <ListItemText primary={"Commented by me"}/>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                <Grid md={7}>
                    <Box p={1}>
                        <List>
                            <ListItem>
                                <ListItemText primary={"All threads"}/>
                            </ListItem>
                            {articles.map((item, index) => {
                                return (
                                    <ThreadListItem thread={item} key={`artciles_${index}`}>
                                    </ThreadListItem>
                                );
                            })}
                        </List>
                    </Box>
                </Grid>
                <Grid md={3}>
                    <Box p={1}>
                        <List>
                            <ListItem>
                                <ListItemText primary={"Top 10 threads"}/>
                            </ListItem>
                            <Divider/>
                            {topArticles.map((item, index) => {
                                return (
                                    <>
                                        <ListItem key={`top_artciles_${index}`}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.title} secondary={`${item.answers} answers`}/>
                                        </ListItem>
                                        <Divider/>
                                    </>
                                );
                            })}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}