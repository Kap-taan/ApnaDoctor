import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from '../../../context/AuthContext';
import { db } from "../../../data/firebase";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const UpcomingAppointments = () => {

    const { user } = UserAuth();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const gettingAppointmentsInfo = async () => {

        setLoading(true);
        const docRef = doc(db, "patients", user.uid);
        const response = await getDoc(docRef);

        if (!response.exists()) {
            console.log('User not found');
            return;
        }

        const appointment = response.data().appointments;
        let futureAppointments = appointment.filter(app => new Date(app.date.seconds * 1000) > new Date());
        setAppointments(futureAppointments.reverse());
        console.log(futureAppointments);
        setLoading(false);
    }

    useEffect(() => {

        if (user) {
            gettingAppointmentsInfo();
        }

    }, [user])

    return (
        <div className="mb-12">
            <h5 className="font-bold mb-6 text-lg">Upcoming Appointments</h5>
            {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
            <div className="max-h-72 overflow-scroll no-scrollbar">
                {!loading && appointments.length > 0 && appointments.map(appointment => (
                    <Link to={`/appointments/${appointment.appointmentId}`} key={appointment.appointmentId} className="flex justify-between items-center mb-6">
                        <img className="w-12" src="/media/Patient/appointment.png" alt="Appointment" />
                        <div>
                            <div className="flex flex-col items-center">
                                <h4>{appointment.doctorName}</h4>
                                <h5 className="text-navText">{new Date(appointment.date.seconds * 1000).toDateString()}</h5>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-navText">{appointment.slot}</h5>
                        </div>
                    </Link>
                ))}
            </div>
            {!loading && appointments.length === 0 && <div className="text-center text-red-600"><h4>No future appointments</h4></div>}
            {/* <div className="flex justify-between items-center mb-6">
                <img className="w-12" src="/media/Patient/appointment.png" alt="Appointment" />
                <div>
                    <div className="flex flex-col items-center">
                        <h4>Dr. Def Singh</h4>
                        <h5 className="text-navText">Mon Nov 03 2022</h5>
                    </div>
                </div>
                <div>
                    <h5 className="text-navText">Physicians</h5>
                </div>
            </div> */}
        </div>
    );
}

export default UpcomingAppointments;