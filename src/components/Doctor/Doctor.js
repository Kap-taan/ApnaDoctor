import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { CurrentUser } from "../../context/UserContext";
import { db } from "../../data/firebase";
import Location from "./Dashboard/Location";
import Navbar from './Navbar'
import Options from "./Dashboard/Options";

const Doctor = () => {

    const { user } = UserAuth();
    const { dispatch } = CurrentUser();

    const [info, setInfo] = useState({});

    const getInfo = async () => {
        if (user.uid) {
            const docRef = doc(db, "doctors", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setInfo(docSnap.data());
                // save the user to the local storage
                localStorage.setItem('doctor', JSON.stringify(docSnap.data()));
                dispatch({ type: 'DOCTOR', payload: docSnap.data() })
            } else {
                console.log('Doctor not found');
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
                    <Options doctorLocation={info.city} />
                    {/* <Categories /> */}
                    {/* <History /> */}
                </div>
                <div className="col-span-1 pl-8">
                    <Location doctorName={info.name} doctorLocation={info.city} />
                    {/* <UpcomingAppointments /> */}
                    {/* <HistoryDoctor /> */}
                </div>
            </div>
        </>
    );
}

export default Doctor;