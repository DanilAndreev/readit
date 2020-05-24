import Avatar from "@material-ui/core/Avatar";
import ImagePicker from "./ImagePicker";
import Box from "@material-ui/core/Box";
import React from "react";
import {coreRequest} from "../../../Utilities/Rest";
import {useHistory, useParams} from 'react-router-dom';


function useClientRect() {
    const [rect, setRect] = React.useState(null);
    const [width, setWidth] = React.useState(0);
    React.useEffect(() => {
        function handleBoundsChange() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleBoundsChange);
        return () => window.removeEventListener('resize', handleBoundsChange);
    }, []);

    const ref = React.useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, [width]);
    return [rect, ref];
}

export default function UserAvatar({user = {}}) {
    const [rect, ref] = useClientRect();
    const [avatar, setAvatar] = React.useState({image: null, date: new Date().toString()});
    const history = useHistory();
    const {id} = useParams();

    React.useEffect(() => {
        handleGetAvatar();
    }, [id]);

    function changeRoute(route) {
        history.push(route);
    }

    function handleGetAvatar() {
        setAvatar({image: `${process.env.REACT_APP_CORE_AVATARS}/${user.id}.jpg`, date: new Date().toString()});
    }

    function handleChangeAvatar(picture) {
        coreRequest().post(`users/${user.id}/avatar`)
            .attach('avatar', picture[0])
            .then(response => {
                handleGetAvatar();
            })
            .catch(error => {
                switch (error.status) {
                    case 401:
                        changeRoute('?login=true');
                        break;
                    default:
                        console.error(error);
                }
            });
    }

    return (
        <Avatar
            ref={ref}
            style={{width: '100%', height: rect && rect.width}}
        >
            <ImagePicker
                onChange={handleChangeAvatar}
                onError={event => setAvatar({image: null, date: new Date().toString()})}
                src={avatar.image}
                date={avatar.date}
            >
                Upload avatar
            </ImagePicker>
        </Avatar>

    );
}