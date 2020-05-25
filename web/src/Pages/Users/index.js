/* Author: Andrieiev Danil | danssg08@gmail.com | https://github.com/DanilAndreev */
import React from "react";
import {coreRequest} from "../../Utilities/Rest";
import {useHistory} from 'react-router-dom';

//MUI components
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";


function UserCard({user, ...props}) {
    const history = useHistory();
    const [imageLoaded, setImageLoaded] = React.useState(true);

    function changeRoute(route) {
        history.push(route);
    }


    return (
        <Grid item xs={12} md={6}>
            <Box p={1}>
                <Card>
                    <CardActionArea onClick={event => changeRoute(`/user/${user.id}`)}>
                        <CardMedia
                            component="img"
                            image={`${process.env.REACT_APP_CORE_AVATARS}/${user.id}.jpg`}
                            alt={`Avatar of user ${user.name}`}
                            height="140"
                            title={user.name}
                            onError={event => event.target.src = 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_grey_512dp.png'}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {user.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`${user.is_admin ? 'Admin | ' : ''}${user.email}`}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={event => changeRoute(`/user/${user.id}`)}>
                            Профіль
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    );
}

export default function Users() {
    const [users, setUsers] = React.useState([]);
    const [connecting, setConnecting] = React.useState(true);

    React.useEffect(() => {
        setConnecting(true);
        coreRequest().get('users')
            .then(response => {
                setUsers(response.body.data);
                setConnecting(false);
            })
            .catch(console.error);
    }, []);

    if (connecting) {
        return null;
    }

    return (
        <Grid item xs={12}>
            <Box p={1}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box p={1}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="textPrimary">Користувачі</Typography>
                            </Breadcrumbs>
                        </Box>
                    </Grid>
                    {users.map(item => <UserCard key={`user-card-${item.id}`} user={item}/>)}
                </Grid>
            </Box>
        </Grid>
    );
}