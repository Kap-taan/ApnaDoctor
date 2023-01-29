import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../data/firebase";
import Navbar from '../Navbar';
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

const SingleDoctor = () => {

    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [appointmentsLoading, setAppointmentsLoading] = useState(false);

    const getInfo = async () => {
        setLoading(true);
        const docRef = doc(db, "doctors", id);
        const docResponse = await getDoc(docRef);
        if (docResponse.exists()) {
            console.log(docResponse.data());
            setDoctor(docResponse.data());
        }
        setLoading(false);
    }

    const getAppointmentsInfo = async () => {
        const collectionRef = query(collection(db, "appointments"), where('doctorId', '==', id));
        const response = await getDocs(collectionRef);
        let tempAppointments = [];
        response.forEach(doc => {
            tempAppointments = [...tempAppointments, { ...doc.data(), id: doc.id }]
        })
        setAppointments(tempAppointments);
    }

    useEffect(() => {
        getInfo();
        getAppointmentsInfo();
    }, [])

    return (
        <>
            <Navbar />
            {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
            {!loading && !doctor && <div className="text-center text-red-500">Not a Valid Doctor</div>}
            {!loading && doctor && <div className="text-white">
                <div className="flex mb-20">
                    <div className="grow flex justify-center items-center">
                        <img className="w-60" src="https://firebasestorage.googleapis.com/v0/b/apnadoctorss.appspot.com/o/categories%2Fdoctor.png?alt=media&token=436fe2d4-c110-4405-b655-a60292803dda" alt="Doctor" />
                    </div>
                    <div className="flex flex-col p-10 items-center grow justify-center">
                        <div className="mb-2">
                            <h2 className="font-bold text-4xl">Dr. Vansh Gumber</h2>
                            <h4 className="text-center text-navText italic">Dermatologists</h4>
                        </div>
                        <div className="flex gap-36 mb-2">
                            <h4 className="text-xl">Meerut</h4>
                            <h4 className="text-xl">MBBS</h4>
                        </div>
                        <div className="flex gap-36">
                            <h4 className="text-xl text-navText">1200+ bookings</h4>
                        </div>
                        <div className="flex gap-36">
                            <h5 className="text-xl text-navText">12+ yrs experience</h5>
                        </div>
                    </div>
                </div>
                <div>
                    {/* max-h-96 overflow-scroll no-scrollbar */}
                    <div className="">
                        {appointmentsLoading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                        {!appointmentsLoading && appointments.length === 0 && <div><h4 className="text-red-400 text-center">No Past Appoitments Available</h4></div>}
                        {!appointmentsLoading && appointments.length > 0 && appointments.map(appointment => (
                            <Link to={`/appointments/${appointment.appointmentId}`} key={appointment.appointmentId} className="bg-cardBackground w-2/4 rounded-3xl mb-6 flex justify-between items-center border-navText">
                                <img className="w-14 p-2" src="/media/Patient/appointment.png" alt="List" />
                                <h3>{appointment.doctorName}</h3>
                                <h4>{new Date(appointment.date.seconds * 1000).toDateString()}</h4>
                                <img className="cursor-pointer w-14 p-2" src="/media/Patient/description.png" alt="Description" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default SingleDoctor;