import useStyles from "../style";
import {useAuth} from "../../../Utilities/Auth";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";

export default function DesktopLeftButtons() {
    const classes = useStyles();
    const {user} = useAuth();
    const history = useHistory();

    function changeRoute(route) {
        history.push(route);
    }

    return (
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
                    {user &&
                    <React.Fragment>
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
                    </React.Fragment>
                    }
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
                    <ListItem
                        dense
                        button
                        onClick={event => changeRoute('/users')}
                    >
                        <PeopleIcon fontSize={'small'}/>
                        <ListItemText
                            primary={"Users"}
                            className={classes.leftPanelButtonsText}
                        />
                    </ListItem>
                </List>
            </Box>
        </Grid>
    );
}
