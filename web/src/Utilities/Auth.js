import React from 'react'


const AuthContext = React.createContext({user: null, token: null});

function AuthProvider(props) {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);

    const isAdmin = () => {
        return user && !!user.is_admin;
    };

    return (
        <AuthContext.Provider value={{user, setUser, token, setToken, isAdmin}} {...props} />
    );
}

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, useAuth}