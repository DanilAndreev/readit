/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev */
import React from "react";
import useStyles from "./style";
import {useHistory} from 'react-router-dom';

//MUI components
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

//Images
import logo from './images/readit_logo_black.png'


export default function About() {
    const history = useHistory();

    function changeRoute(route){
        history.push(route);
    }

    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <List>
                <ListItem>
                    <Grid container justify={'center'}>
                        <Grid item xs={8} md={6}>
                            <img
                                src={logo}
                                className={classes.logo}
                            />
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Typography variant={'h5'}>
                        Що таке Readit
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant={'body1'}>
                        Readit - це функціональний веб портал для знаходження відповіді на будь-які питання.
                        Ви можете створювати питання на будь-які теми, а інші учасники можуть вам відповісти на ваше
                        питання.
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant={'h5'}>
                        Чому Readit
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant={'body1'}>
                        У нас ви зможете знайти відзивчиве комьюніті. Політика сайту не дозволяє грубо відноситись до
                        співучасників форуму. Знайдеться багато людей, що захочуть допомогти вам з вашою проблемою.
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant={'h5'}>
                        Що робити?
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant={'body1'}>
                        Платформа дозволяє:
                    </Typography>
                </ListItem>
                <ListItem>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={'Створювати питання'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={'Відповідати на питання інших людей'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={'Кастомізувати свій профіль'}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={'Знаходити однодумців'}
                            />
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem>
                    <Typography variant={'h5'}>
                        І що далі?
                    </Typography>
                </ListItem>
                <ListItem>
                    <Typography variant={'body1'}>
                        Вперед, спілкуватися!
                    </Typography>
                </ListItem>
                <ListItem>
                    <Button
                        onClick={() => changeRoute('/threads')}
                        variant={'outlined'}
                        fullWidth
                    >
                        До питань
                    </Button>
                </ListItem>
            </List>
        </Grid>
    );
}