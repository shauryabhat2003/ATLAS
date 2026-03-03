import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../lib/firebase-config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setIsLoaded(true);
        });
        return () => unsubscribe();
    }, []);

    const signOut = () => firebaseSignOut(auth);

    // Helper to get the Firebase ID token for API calls
    const getToken = async () => {
        if (!user) return null;
        return user.getIdToken();
    };

    const value = {
        user,
        userId: user?.uid || null,
        isLoaded,
        isSignedIn: !!user,
        signOut,
        getToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
