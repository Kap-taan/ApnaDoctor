import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../data/firebase";
import Navbar from "../Navbar";
import QRCode from "react-qr-code";
import { ColorRing } from "react-loader-spinner";

const SingleAppointment = () => {

    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(false);

    const getInfo = async () => {
        setLoading(true);
        const docRef = doc(db, "appointments", id);
        const docResponse = await getDoc(docRef);

        if (docResponse.exists()) {
            console.log(docResponse.data());
            setAppointment(docResponse.data());
        }

        setLoading(false);

    }

    useEffect(() => {
        getInfo();
    }, [])

    return (
        <>
            <Navbar />
            {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
            {!loading && !appointment && <div className="text-center text-red-500">Not a Valid Appointment</div>}
            {!loading && appointment && <div className="flex justify-between">
                <div className="grow px-10 py-5">
                    <div className="mb-2">
                        <div className="flex justify-between">
                            <h4 className="text-navText text-lg">Appointment No. <span className="font-normal text-md text-white">{id}</span></h4>
                            <h4 className="text-navText text-lg">Created At  <span className="font-normal text-lg text-white">{new Date(appointment.createdAt.seconds * 1000).toDateString()}</span></h4>
                        </div>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <h4 className="text-navText text-lg">Date of Appointment <span className="font-normal text-lg text-white">{new Date(appointment.date.seconds * 1000).toDateString()}</span></h4>
                        <h4 className="text-navText text-lg">Slot <span className="font-normal text-lg text-white">{appointment.slot}</span></h4>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <h4 className="text-navText text-lg">Appointment with <span className="font-normal text-lg text-white">{appointment.doctorName}</span></h4>
                        <div className="flex">
                            <h4 className="text-navText text-lg">Problems :&nbsp;</h4>
                            {appointment.problems.length > 0 && appointment.problems.map(problem => (
                                <h4 className="font-normal text-lg text-white" key={problem}>{problem}&nbsp;</h4>
                            ))}
                        </div>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <h4 className="text-navText text-lg">Patient Name : <span className="font-normal text-lg text-white">{appointment.patientName}</span></h4>
                        <h4 className="text-navText text-lg">Patient Age : <span className="font-normal text-lg text-white">{appointment.patientAge}</span></h4>
                    </div>
                </div>
                <div className="">
                    <QRCode size={10} style={{ height: "auto", maxWidth: "10rem", width: "10rem" }} value="hello" viewBox={`0 0 256 256`} />
                </div>
            </div>}
        </>
    );
}

export default SingleAppointment;

