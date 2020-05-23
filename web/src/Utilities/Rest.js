import superagent from 'superagent';


export const request = (endPoint) => {
    if (!endPoint) {
        console.error("request endPoint undefined");
    }
    const rlog = (p, s) => console.log(`request.${p}:`, s);
    return {
        endPoint: () => endPoint,
        post: (route) => {
            const url = `${endPoint}/${route}`;
            rlog('post', url);
            return superagent.post(url).set('accept', 'application/json').withCredentials();
        },

        put: (route) => {
            const url = `${endPoint}/${route}`;
            rlog('put', url);
            return superagent.put(url).set('accept', 'application/json').withCredentials();
        },

        delete: (route) => {
            const url = `${endPoint}/${route}`;
            rlog('delete', url);
            return superagent.delete(url).set('accept', 'application/json').withCredentials();
        },

        get: (route) => {
            const url = `${endPoint}/${route}`;
            rlog('get', url);
            return superagent.get(url).set('accept', 'application/json').withCredentials();
        }
    }
};

export const coreRequest = (path = null) => {
    return request(path || process.env.REACT_APP_CORE_URL);
};
