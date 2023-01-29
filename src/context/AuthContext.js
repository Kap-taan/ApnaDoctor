import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../data/firebase";
import { doc, getDoc, writeBatch, increment } from 'firebase/firestore';
import { db } from "../data/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const passwordSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const passwordSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logout = () => {
        signOut(auth)
    }

    const isDocumentPresent = async (user) => {

        console.log('I m here');

        // user.uid
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            // Do nothing
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // Add doc and update the count
            const batch = writeBatch(db);

            const userCountRef = doc(db, "generalInfo", "users");
            batch.update(userCountRef, {
                count: increment(1)
            })

            const userRef = doc(db, "users", user.uid);
            batch.set(userRef, {
                authId: user.uid,
                type: 'patient'
            })

            await batch.commit();
        }

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser !== null) {
                if (currentUser.displayName !== null) {
                    // Google Authentication
                    console.log('Google Authentication');
                    isDocumentPresent(currentUser);
                }
            }
            console.log(currentUser);
        })

        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, user, logout, passwordSignIn, passwordSignUp, forgotPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(AuthContext);
}