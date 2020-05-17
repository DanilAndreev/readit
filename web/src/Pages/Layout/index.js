import React from 'react'
import useStyles from "./style";
import {LightTheme, BaseTheme} from './../../Themes/DefaultTheme'
import {ThemeProvider} from '@material-ui/core/styles';
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {withWidth, isWidthDown, isWidthUp} from "@material-ui/core";
import {coreRequest} from "../../Utilities/Rest";
import {useAuth} from "../../Utilities/Auth";
import qs from 'qs'


//Pages
import ThreadsViewer from "../ThreadsViewer";
import ThreadDetails from "../ThreadDetails";
import ThreadEditor from "../ThreadEditor";
import AuthDialog from "../Auth";
import RegistrationDialog from "../Registration";
import Account from "../Account";

//MUI components
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

//MUI icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RateReviewIcon from '@material-ui/icons/RateReview';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ImageIcon from '@material-ui/icons/Image';
import SearchIcon from '@material-ui/icons/Search';

//Custom components
import ThreadsListItem from "./Components/ThreadsListItem";
import PagesSwitch from "./Components/PagesSwitch";


function Layout({width, ...props}) {
    const classes = useStyles();
    const history = useHistory();
    const [search, setSearch] = React.useState('');
    const [articles, setArticles] = React.useState([]);
    const [authData, setAuthData] = React.useState({email: null, password: null, remember: false});
    const {user, setUser, setToken} = useAuth();
    const [gotUser, setGotUser] = React.useState(false);
    const location = useLocation();
    const {register, login} = qs.parse(location.search, {ignoreQueryPrefix: true});
    let loading = false;

    const [topArticles, setTopArticles] = React.useState([]);

    function changeRoute(route) {
        history.push(route);
    }

    React.useEffect(() => {
        loading = true;
        //changeRoute('/threads');
    }, []);

    React.useEffect(() => {
        loading = true;
        coreRequest().get('users/me')
            .then(response => {
                setUser({...response.body.data, created_at: undefined, updated_at: undefined});
                setGotUser(true);
            })
            .catch(error => {
                setUser(null);
                setGotUser(true);
            });
    }, []);

    React.useEffect(() => {
        loading = true;
        coreRequest().get('questions/top10')
            .then(response => {
                setTopArticles(response.body.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function handleLogout() {
        coreRequest().post('auth/logout')
            .send({})
            .then(response => {
                setToken(null);
                setUser(null);
            })
            .catch(console.error);
    }

    function handleFindQuestion() {
        search && changeRoute(`/threads?search=${search}`);
        !search && changeRoute('/threads');
    }

    function handleAuthenticated(user) {
        changeRoute(location.pathname);
    }

    function handleAuthClose() {
        changeRoute(location.pathname);
        setAuthData({username: null, password: null});
    }

    function handleRegistrationClose() {
        changeRoute(location.pathname);
    }

    function handleSearchInput(event) {
        setSearch(event.target.value);
    }

    function handleCreateThread(event) {
        user && changeRoute('/editthread/new');
        !user && changeRoute(`?login=true`);
    }

    if (loading || !gotUser) {
        return null;
    }

    return (
        <>
            <Dialog aria-labelledby="auth-dialog" open={!!login} onClose={handleAuthClose}>
                <DialogTitle id="auth-dialog-title">Authentication</DialogTitle>
                <AuthDialog authData={authData} setAuthData={setAuthData} onComplete={handleAuthenticated}/>
            </Dialog>
            <Dialog aria-labelledby="auth-dialog" open={!!register} onClose={handleRegistrationClose}>
                <DialogTitle id="auth-dialog-title">Registration</DialogTitle>
                <RegistrationDialog onComplete={handleAuthenticated}/>
            </Dialog>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Forum
                    </Typography>
                    {!user && <Button color="inherit" onClick={() => changeRoute(`?register=true`)}>Sign up</Button>}
                    {!user && <Button color="inherit" onClick={() => changeRoute(`?login=true`)}>Login</Button>}
                    {user && <Button color="inherit">
                        {user.name}
                        <Avatar className={classes.avatar}>
                            <ImageIcon/>
                        </Avatar>
                    </Button>}
                    {user && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
                </Toolbar>
            </AppBar>
            <Grid container>
                {isWidthUp('sm', width) && <Grid item md={1} lg={2}/>}
                <Grid item xs={12} md={10} lg={8} id={'page'}>
                    <Box>
                        <ThemeProvider theme={LightTheme}>
                            <Grid container className={classes.topLine}>
                                <Grid item xs={12} md={2}/>
                                <Grid item xs={12} md={7}>
                                    <Box p={1}>
                                        <div className={classes.searchLineBase}>
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                label={'Find question'}
                                                size={'small'}
                                                name={'search'}
                                                onChange={handleSearchInput}
                                                autoComplete={'search'}
                                            />
                                            <Button
                                                variant={'contained'}
                                                color={'primary'}
                                                onClick={handleFindQuestion}
                                            >
                                                <SearchIcon/>
                                            </Button>
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <div className={classes.createThreadButtonContainer}>
                                        <Box p={1} className={classes.createThreadButtonBox}>
                                            <Button
                                                fullWidth
                                                variant={'contained'}
                                                color={'secondary'}
                                                className={classes.createThreadButton}
                                                onClick={handleCreateThread}
                                            >
                                                Create thread
                                            </Button>
                                        </Box>
                                    </div>
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                        <Grid container>
                            <ThemeProvider theme={LightTheme}>
                                <Grid item xs={12} md={2} className={classes.leftColumn}>
                                    <Box p={1}>
                                        <List>
                                            <ListItem
                                                dense
                                                button
                                                onClick={event => changeRoute('/threads')}
                                            >
                                                <FormatListBulletedIcon fontSize={'small'}/>
                                                <ListItemText
                                                    primary={"All threads"}
                                                    className={classes.leftPanelButtonsText}
                                                />
                                            </ListItem>
                                            <ListItem
                                                dense
                                                button
                                                onClick={event => changeRoute('/threads/my')}
                                            >
                                                <RecordVoiceOverIcon fontSize={'small'}/>
                                                <ListItemText
                                                    primary={"My threads"}
                                                    className={classes.leftPanelButtonsText}
                                                />
                                            </ListItem>
                                            <ListItem
                                                dense
                                                button
                                                onClick={event => changeRoute('/threads/commented')}
                                            >
                                                <RateReviewIcon fontSize={'small'}/>
                                                <ListItemText
                                                    primary={"Commented by me"}
                                                    className={classes.leftPanelButtonsText}
                                                />
                                            </ListItem>
                                            <Divider/>
                                            {user &&
                                            <ListItem
                                                dense
                                                button
                                                onClick={event => changeRoute(`/user/${user.id}`)}
                                            >
                                                <AccountCircleIcon fontSize={'small'}/>
                                                <ListItemText
                                                    primary={"My account"}
                                                    className={classes.leftPanelButtonsText}
                                                />
                                            </ListItem>
                                            }
                                        </List>
                                    </Box>
                                </Grid>
                            </ThemeProvider>
                            <Grid item xs={12} md={7} className={classes.contentColumn}>
                                <Grid container>
                                    <PagesSwitch
                                        articles={articles}
                                        setArticles={setArticles}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={3} className={classes.rightColumn}>
                                <Box p={1}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={"Top 10 threads"}/>
                                        </ListItem>
                                        <Divider/>
                                        {topArticles.map((item, index) => {
                                            return (
                                                <ThreadsListItem key={`top_artciles_${index}`} thread={item}/>
                                            );
                                        })}
                                    </List>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                {isWidthUp('sm', width) && <Grid item md={1} lg={2}/>}
            </Grid>
        </>
    );
}

export default withWidth()(Layout);