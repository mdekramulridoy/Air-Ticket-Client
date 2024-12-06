import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.init";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const createdUser = result.user;
            await updateProfile(createdUser, {
                displayName: displayName,
                photoURL: photoURL,
            });
            setUser({ ...createdUser, displayName, photoURL });
            return createdUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            console.error("Error signing in user:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            return result;
        } catch (error) {
            console.error("Error signing in with Google:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOutUser = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out user:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (displayName, photoURL) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName,
                photoURL,
            });
            setUser({ ...auth.currentUser, displayName, photoURL });
        } catch (error) {
            console.error("Error updating profile:", error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        updateUserProfile, 
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
