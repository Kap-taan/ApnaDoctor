import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { SelectedDoctor } from "../../context/DoctorContext";
import { CurrentUser } from "../../context/UserContext";
import { db } from "../../data/firebase";
import Categories from "./Dashboard/Categories";
import History from "./Dashboard/History";
import HistoryDoctor from "./Dashboard/HistoryDoctor";
import Location from "./Dashboard/Location";
import Navbar from './Navbar'
import Options from "./Dashboard/Options";
import UpcomingAppointments from "./Dashboard/UpcomingAppointments";

const Patient = () => {

    const { user } = UserAuth();
    const { dispatch } = CurrentUser();

    const [info, setInfo] = useState({});

    const navigate = useNavigate();


    const getInfo = async () => {
        if (user.uid) {
            const docRef = doc(db, "patients", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setInfo(docSnap.data());
                // save the user to the local storage
                localStorage.setItem('patient', JSON.stringify(docSnap.data()));
                dispatch({ type: 'PATIENT', payload: docSnap.data() })
            } else {
                navigate('/patientinfo');
            }
        }


    }

    useEffect(() => {
        getInfo();
    }, [user])

    return (
        <>
            <Navbar />
            <div className=" grid grid-cols-3">
                <div className=" col-span-2">
                    <Options patientLocation={info.location} />
                    <Categories />
                    <History />
                </div>
                <div className="col-span-1 pl-8">
                    <Location patientName={info.name} patientLocation={info.location} />
                    <UpcomingAppointments />
                    <HistoryDoctor />
                </div>
            </div>
        </>
    );
}

export default Patient;