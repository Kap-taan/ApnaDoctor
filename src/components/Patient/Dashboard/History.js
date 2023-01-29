import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from '../../../context/AuthContext';
import { db } from "../../../data/firebase";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const History = () => {

    const { user } = UserAuth();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAppointmentInfo = async () => {

        setLoading(true);

        const patientRef = doc(db, "patients", user.uid);
        const response = await getDoc(patientRef);

        if (!response.exists()) {
            console.log('Document not present');
            setLoading(false);
        }

        const data = response.data().appointments;
        let tempAppointments = data.filter(appointment => {
            return new Date(appointment.date.seconds * 1000) < new Date()
        })

        setAppointments(tempAppointments)

        setLoading(false);

    }

    useEffect(() => {

        getAppointmentInfo();

    }, [user])

    return (
        <div>
            <div className="mb-8">
                <h5 className=" text-lg">History</h5>
                {/* <p className="text-sm text-navText">Bookings of last 6 months</p> */}
            </div>
            <div className="max-h-96 overflow-scroll no-scrollbar">
                {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                {!loading && appointments.length === 0 && <div><h4 className="text-red-400 text-center">No Past Appoitments Available</h4></div>}
                {!loading && appointments.length > 0 && appointments.map(appointment => (
                    <Link to={`/appointments/${appointment.appointmentId}`} key={appointment.appointmentId} className="bg-cardBackground rounded-3xl mb-6 flex justify-between items-center border-navText">
                        <img className="w-14 p-2" src="/media/Patient/appointment.png" alt="List" />
                        <h3>{appointment.doctorName}</h3>
                        <h4>{new Date(appointment.date.seconds * 1000).toDateString()}</h4>
                        <img className="cursor-pointer w-14 p-2" src="/media/Patient/description.png" alt="Description" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default History;