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
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import RateReviewIcon from '@material-ui/icons/RateReview';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import useStyles from "./style";
import Badge from "@material-ui/core/Badge";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Pagination from '@material-ui/lab/Pagination';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {LightTheme} from './../../Themes/DefaultTheme'
import {ThemeProvider} from '@material-ui/core/styles';


function ThreadListItem({thread, ...props}) {
    const primary = (
        <Typography>
            {thread.title}
        </Typography>
    );
    const secondary = (
        <ListItemSecondaryAction>
            <Badge badgeContent={thread.answers} color="primary">
                <QuestionAnswerIcon/>
            </Badge>
            <Badge badgeContent={thread.answers} color="primary">
                <VisibilityIcon/>
            </Badge>
        </ListItemSecondaryAction>
    );

    return (
        <>
            <ListItem button>
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

function TopThreadsListItem({thread, ...props}) {
    const classes = useStyles();

    const primary = (
        <Typography variant={'body2'}>
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
            <ListItem button>
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
    const classes = useStyles();
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
            <ThemeProvider theme={LightTheme}>
                <Grid container className={classes.leftColumn}>
                    <Grid sm={12} md={2}>

                    </Grid>
                    <Grid sm={12} md={7}>
                        <Box p={1}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={'Find question'}
                                size={'small'}
                            />
                        </Box>
                    </Grid>
                    <Grid sm={12} md={3}>
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
            </ThemeProvider>
            <Grid container>
                <ThemeProvider theme={LightTheme}>
                <Grid sm={12} md={2} className={classes.leftColumn}>
                    <Box p={1}>
                        <List>
                            <Divider/>
                            <ListItem dense button>
                                <FormatListBulletedIcon fontSize={'small'}/>
                                <ListItemText primary={" All threads"}/>
                            </ListItem>
                            <ListItem dense button>
                                <RecordVoiceOverIcon fontSize={'small'}/>
                                <ListItemText primary={" My threads"}/>
                            </ListItem>
                            <ListItem dense button>
                                <RateReviewIcon fontSize={'small'}/>
                                <ListItemText primary={" Commented by me"}/>
                            </ListItem>
                        </List>
                    </Box>
                </Grid>
                </ThemeProvider>
                <Grid sm={12} md={7} className={classes.contentColumn}>
                    <Box p={1}>
                        <List>
                            <ListItem>
                                <ListItemText primary={"All threads"}/>
                            </ListItem>
                            <ListItem>
                                <ToggleButtonGroup size="small">
                                    <ToggleButton value="left">
                                        Newest
                                    </ToggleButton>
                                    <ToggleButton value="left">
                                        Most popular
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </ListItem>
                            {articles.map((item, index) => {
                                return (
                                    <ThreadListItem thread={item} key={`artciles_${index}`}>
                                    </ThreadListItem>
                                );
                            })}
                        </List>
                        <Pagination count={10}/>
                    </Box>
                </Grid>
                <Grid sm={12} md={3} className={classes.rightColumn}>
                    <Box p={1}>
                        <List>
                            <ListItem>
                                <ListItemText primary={"Top 10 threads"}/>
                            </ListItem>
                            <Divider/>
                            {topArticles.map((item, index) => {
                                return (
                                    <TopThreadsListItem key={`top_artciles_${index}`} thread={item}/>
                                );
                            })}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}