import React, { createContext, useEffect, useState, useCallback} from 'react';
import { api, csfr } from '../services/api';

const AuthContext = createContext({
    chatCurrent: {},
    setChatCurrent: () => {},
    userLogued: {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {

    const [ userLogued, setUserLogued ] = useState({});
    const [ chatCurrent, setChatCurrent ] = useState({});

    useEffect(() => getInfoUser(), []);

    const logout = () => {
        api.post('/logout', { _token: csfr })
        .catch(error => {
            console.log(error);
        });
        location.reload();
    }

    const getInfoUser = () => {
        api.get('/user').then(res => {
            setUserLogued(res);
        }).catch(error => {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        });
    };

    return (
        <AuthContext.Provider value={{
            chatCurrent,
            setChatCurrent,
            userLogued,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
