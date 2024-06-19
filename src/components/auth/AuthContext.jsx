import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setIsLoggedIn(!!user)
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        isLoggedIn,
        login:() => auth.signInWithEmailAndPassword(email, password),
        logout: () => auth.signOut()
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}