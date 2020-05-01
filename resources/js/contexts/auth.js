import React, { createContext } from 'react';
import { api, csfr } from '../services/api';

const AuthContext = createContext({
    signed: true,
    user: {},
    logout: () => {}
});

export const AuthProvider = ({ children }) => {

    const logout = () => {
        try {
            api.post('/logout', { _token: csfr });
            location.reload();
        } catch (error) {
            console.log(error);
            alert(`Erro no logout, tente novamente`);
        }
    }

    return (
        <AuthContext.Provider value={{
            signed: true,
            user: {},
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
