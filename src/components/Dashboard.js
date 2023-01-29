import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Doctor from "./Doctor/Doctor";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../data/firebase";
import Patient from "./Patient/Patient";
import { FallingLines } from 'react-loader-spinner';

const Dashboard = () => {

    const { user } = UserAuth();

    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);

    const findingType = async () => {


        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setLoading(false);
            setType(docSnap.data().type);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user != null) {
            // Finding the Type
            setLoading(true);
            findingType()
        } else {
            setLoading(false);
        }
    }, [user])

    return (
        <div className="text-white">
            {loading && <div className="flex justify-center items-center"><FallingLines color="#EC653D" width="100" height="100" visible={true} ariaLabel='falling-lines-loading' /></div>}
            {type === 'doctor' && <Doctor />}
            {type === 'patient' && <Patient />}
        </div>
    )
}

export default Dashboard;