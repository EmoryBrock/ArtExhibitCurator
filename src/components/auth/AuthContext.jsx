import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setIsLoggedIn(!!user);  // Set isLoggedIn based on user state
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (email, password) => auth.signInWithEmailAndPassword(email, password);

    const logout = () => {
        auth.signOut().then(() => {
            setCurrentUser(null);
            setIsLoggedIn(false);  // Update isLoggedIn state
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    const value = {
        currentUser,
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
