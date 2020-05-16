import React from 'react'
import useStyles from "./style";
import {useHistory} from 'react-router-dom'
import {coreRequest} from "../../Utilities/Rest";

//MUI components
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Pagination from '@material-ui/lab/Pagination';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//MUI icons
import ImageIcon from '@material-ui/icons/Image';
import VisibilityIcon from '@material-ui/icons/Visibility';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';


function ThreadListItem({thread, ...props}) {
    const classes = useStyles();
    const history = useHistory();

    function changeRoute(route) {
        history.push(route);
    }

    const primary = (
        <Typography>
            {thread.title}
        </Typography>
    );
    const secondary = (
        <ListItemSecondaryAction>
            <Badge badgeContent={thread.answers} color="primary">
                <QuestionAnswerIcon className={classes.ratingBadge}/>
            </Badge>
            <Badge badgeContent={thread.answers} color="primary">
                <VisibilityIcon className={classes.ratingBadge}/>
            </Badge>
        </ListItemSecondaryAction>
    );


    return (
        <>
            <ListItem button onClick={event => changeRoute('/thread/1')}>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={primary} className={classes.threadsList}/>
                {secondary}
            </ListItem>
            <Divider/>
        </>
    );
}

export default function ThreadsViewer() {
    const classes = useStyles();
    const history = useHistory();
    const [sortBy, setSortBy] = React.useState('newest');
    const [articles, setArticles] = React.useState([]);
    const [pages, setPages] = React.useState(1);

    React.useEffect(() => {
        coreRequest().get('questions')
            .query({page: 0})
            .then(response => {
                console.log(response);
                setArticles(response.body.data);
                setPages(response.body.meta.last_page);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function changeRoute(route) {
        history.push(route);
    }
/*
    const articles = [
        {title: 'Какие книги читать по python для продолжение изучения?\n', answers: 4, views: 100},
        {title: 'Как добавлять текст к input?', answers: 2, views: 200},
        {title: 'Какой монитор на IPS матрице выбрать?', answers: 8, views: 134},
        {
            title: 'Как устроена андроид разработка по аналогии с веб фронтенд разработкой? What is this',
            answers: 4,
            views: 2834
        },
        {title: 'Что не так с кодом ютуба?', answers: 10, views: 123}
    ];

 */

    function handleToggleSort(event, newValue) {
        setSortBy(newValue);
    }

    return (
        <Grid item xs={12}>
            <Box p={1}>
                <List>
                    <ListItem>
                        <ListItemText primary={"All threads"}/>
                    </ListItem>
                    <ListItem>
                        <ToggleButtonGroup
                            value={sortBy}
                            size="small"
                            exclusive
                            onChange={handleToggleSort}
                        >
                            <ToggleButton value="newest">
                                Newest
                            </ToggleButton>
                            <ToggleButton value="popular">
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
                <div className={classes.paginationContainer}>
                    <Pagination count={pages} className={classes.pagination}/>
                </div>
            </Box>
        </Grid>

    );
}