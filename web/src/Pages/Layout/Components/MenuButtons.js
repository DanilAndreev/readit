import React from "react";
import useStyles from "../style";
import {useAuth} from "../../../Utilities/Auth";
import {useHistory} from "react-router-dom";

//MUI components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ListItemText from "@material-ui/core/ListItemText";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import Divider from "@material-ui/core/Divider";

//MUI Icons
import PeopleIcon from "@material-ui/icons/People";
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RateReviewIcon from "@material-ui/icons/RateReview";


export default function MenuButtons() {
    const classes = useStyles();
    const {user} = useAuth();
    const history = useHistory();

    function changeRoute(route) {
        history.push(route);
    }

    return (
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
            <ListItem
                dense
                button
                onClick={event => changeRoute('/about')}
            >
                <HelpIcon fontSize={'small'}/>
                <ListItemText
                    primary={"About"}
                    className={classes.leftPanelButtonsText}
                />
            </ListItem>
        </List>
    );
}
