import {coreRequest} from "./Rest";

export default async function getAvatar(id) {
    try{
//        return (await coreRequest(process.env.REACT_APP_CORE_AVATARS).get(`${id}`))
        return (await coreRequest(process.env.REACT_APP_CORE_AVATARS).get(`${id}.jpg`))
    } catch (error) {
        return null;
    }
}