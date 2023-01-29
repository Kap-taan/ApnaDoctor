import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from '../../../context/AuthContext'
import { db } from "../../../data/firebase";
import { ColorRing } from 'react-loader-spinner';
import { Link } from "react-router-dom";

const HistoryDoctor = () => {

    const { user } = UserAuth();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    const getDoctorsInfo = async () => {
        setLoading(true);
        const docRef = doc(db, "patients", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setDoctors(docSnap.data().doctorsIds);
        } else {
            console.log('Unable to fetch');
        }
        setLoading(false);
    }

    useEffect(() => {
        getDoctorsInfo();
    }, [])

    return (
        <div className="">
            <h5 className="font-bold mb-6 text-lg">History of Doctors</h5>
            {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
            {!loading && doctors.length === 0 && <div><h4 className="text-red-400 text-center">No Doctors Available</h4></div>}
            <div className="max-h-72 overflow-scroll no-scrollbar">
                {!loading && doctors.length > 0 && doctors.map(doctor => (
                    <Link to={`/doctors/${doctor.id}`} key={doctor.id} className="flex justify-between items-center mb-6">
                        <img className="w-12" src="/media/Patient/doctor.png" alt="Doctor" />
                        <div>
                            <div className="flex flex-col items-center">
                                <h4>{doctor.name}</h4>
                                <h5 className="text-navText">{doctor.specialist[0].toLocaleUpperCase()}{doctor.specialist.substring(1, doctor.specialist.length - 1)}</h5>
                            </div>
                        </div>
                        <div>
                            <img className="w-12" src="/media/Patient/info.svg" alt="Info" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HistoryDoctor;