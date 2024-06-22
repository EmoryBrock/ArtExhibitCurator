import React, { useContext, useState, useEffect } from 'react';
import { auth, signUp } from '../../firebase';
import { updateProfile } from 'firebase/auth';

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
            setIsLoggedIn(!!user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (email, password) => auth.signInWithEmailAndPassword(email, password);

    const signup = async (email, password, username) => {
        try {
            const userCredential = await signUp(email, password, username);
            await updateProfile(auth.currentUser, {
                displayName: username,
            });
            setCurrentUser(userCredential.user);
            setIsLoggedIn(true);
            return userCredential.user; // Ensure to return the user object
        } catch (error) {
            console.error("Error signing up:", error);
            throw error; // Re-throw the error to be handled by the caller
        }
    };

    const logout = () => {
        auth.signOut().then(() => {
            setCurrentUser(null);
            setIsLoggedIn(false);
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    const value = {
        currentUser,
        isLoggedIn,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
