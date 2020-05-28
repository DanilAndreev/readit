/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev
   Copyright (C) 2020 */
import React from 'react'
import useStyles from "./style";
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {coreRequest} from "../../Utilities/Rest";
import qs from 'qs';
import {useAuth} from "../../Utilities/Auth";
import {Helmet} from "react-helmet";

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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

//MUI icons
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
            <Badge badgeContent={thread.reply_count} showZero color="primary">
                <QuestionAnswerIcon className={classes.ratingBadge}/>
            </Badge>
            <Badge badgeContent={thread.views_count} showZero color="primary">
                <VisibilityIcon className={classes.ratingBadge}/>
            </Badge>
        </ListItemSecondaryAction>
    );


    return (
        <>
            <ListItem button onClick={event => changeRoute(`/thread/${thread.id}`)}>
                <ListItemAvatar>
                    <Avatar
                        src={`${process.env.REACT_APP_CORE_AVATARS}/${thread.user.id}.jpg`}
                    >
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={primary}
                    secondary={`${thread.user.name} | ${new Date(thread.created_at).toLocaleString()}`}
                    className={classes.threadsList}
                />
                {secondary}
            </ListItem>
            <Divider/>
        </>
    );
}

export default function ThreadsViewer({articles, setArticles, ...props}) {
    const classes = useStyles();
    const history = useHistory();
    const [sortBy, setSortBy] = React.useState('created_at');
    const [pages, setPages] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const location = useLocation();
    const {mode} = useParams();
    const {search} = qs.parse(location.search, {ignoreQueryPrefix: true});
    const {user} = useAuth();
    const updater = React.useRef();

    function getArticles(page) {
        if (!search) {
            coreRequest().get(`questions${(mode && user) ? `/${mode}` : ''}`)
                .query({page: page, sort: sortBy})
                .then(response => {
                    setArticles(response.body.data);
                    setPages(response.body.meta.last_page);
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            coreRequest().get('questions')
                .query({search, page, sort: sortBy})
                .then(response => {
                    setArticles(response.body.data);
                }).catch(error => {
                console.error(error);
            });
        }
    }

    React.useEffect(() => {
        getArticles(1);
        clearInterval(updater.current);
        updater.current = setInterval(() => {
            if (!search) {
                console.log(`Sync [threads]: synchronizing (${new Date().toLocaleString()})`);
                getArticles();
            } else {
                console.log(`Sync [threads]: skipping synchronization (${new Date().toLocaleString()})`);
            }
        }, 30000);

        return () => {
            clearInterval(updater.current);
        }
    }, [mode, sortBy]);

    React.useEffect(() => {
        getArticles(1);
    }, [search, sortBy]);

    function changeRoute(route) {
        history.push(route);
    }

    function handleToggleSort(event, newValue) {
        setSortBy(newValue);
    }

    function handleChangePage(event, page) {
        setPage(page);
        getArticles(page);
    }

    return (
        <Grid item xs={12}>
            <Helmet>
                <title>Readit | Threads</title>
            </Helmet>
            <Box p={1}>
                <List>
                    <ListItem>
                        <Breadcrumbs aria-label="breadcrumb">
                            {!search && <Typography color="textPrimary">Питання</Typography>}
                            {search && <Link onClick={event => changeRoute('/threads')} color="textPrimary">Питання</Link>}
                            {search && <Typography color="textPrimary">Результати для: {search}</Typography>}
                        </Breadcrumbs>
                    </ListItem>
                    <ListItem>
                        <ToggleButtonGroup
                            value={sortBy}
                            size="small"
                            exclusive
                            onChange={handleToggleSort}
                        >
                            <ToggleButton value="created_at">
                                Найновіші
                            </ToggleButton>
                            <ToggleButton value="reply_count">
                                По відповідям
                            </ToggleButton>
                            <ToggleButton value="views_count">
                                Популярні
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
                    <Pagination count={pages} page={page} onChange={handleChangePage} className={classes.pagination}/>
                </div>
            </Box>
        </Grid>

    );
}