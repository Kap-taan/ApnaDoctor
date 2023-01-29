import { collection, getDocs, limit, orderBy, query, where, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../data/firebase";
import Navbar from '../Navbar'
import { ColorRing, LineWave } from "react-loader-spinner";
import { SelectedDoctor } from "../../../context/DoctorContext";
import { CurrentUser } from "../../../context/UserContext";

const SearchDoctor = () => {

    const { user } = UserAuth();

    const { city } = useParams();

    const [doctors, setDoctors] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState('');

    const [slotLoading, setSlotLoading] = useState(false);

    const { dispatch } = SelectedDoctor();
    const { patient } = CurrentUser();

    const navigate = useNavigate();

    const searchHandler = (e) => {
        console.log(e.target.value);
        setDoctor(e.target.value);
        let tempDoctors = allDoctors.filter(doctor => doctor.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
        setDoctors(tempDoctors);
    }

    const queryHandler = (e) => {
        console.log(doctor);
    }

    const getDoctorsInfo = async () => {
        setLoading(true);
        const docRef = query(collection(db, "doctors"), where("city", "==", city), orderBy("noOfBookings", "desc"), limit(5))
        const docsSnap = await getDocs(docRef);
        let tempDoctors = [];
        docsSnap.forEach(doc => {
            tempDoctors = [...tempDoctors, { ...doc.data() }];
        })
        setDoctors(tempDoctors);
        setAllDoctors(tempDoctors);
        setLoading(false);
    }

    const slotHandler = async (id, name, city, specialist) => {
        setSlotLoading(true);
        console.log(id, name);
        dispatch({ type: 'ADD', payload: { id, name } });
        // Add this doctor to the patient document and update the local storage
        const docRef = doc(db, "patients", user.uid);
        let tempDoctor = patient.doctorsIds.filter(doctor => doctor.id === id);
        if (!tempDoctor.length) {
            await updateDoc(docRef, {
                doctorsIds: [...patient.doctorsIds, {
                    id, name, location: city, specialist
                }]
            });
        }
        setSlotLoading(false);
        navigate('/slot');
    }


    useEffect(() => {
        getDoctorsInfo();
    }, [])

    return (
        <>
            <Navbar />
            <div className="flex justify-center">
                <div className="py-12 px-28 bg-infoBackground rounded-lg">
                    <div className="flex pb-5 mb-10 border-b border-navText">
                        <input value={doctor} onChange={searchHandler} className="py-3 px-5 w-96 rounded-l-full" type="text" placeholder="Search Doctors" />
                        <button onClick={queryHandler} className="bg-primary flex justify-center items-center py-2 px-5 rounded-r-full cursor-pointer text-white">Search More</button>
                    </div>
                    <div>
                        {!loading && doctors.length === 0 && <div><h4 className="text-red-400 text-center">No Doctors Available</h4></div>}
                        {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                        {!loading && doctors.length > 0 && doctors.map(doctor => (
                            <div key={doctor.authId} className="bg-infoField rounded-md px-3 py-3 flex justify-between mb-6">
                                <img className="w-14" src="/media/Patient/doctor.png" alt="Doctor" />
                                <div className="flex flex-col items-center justify-center">
                                    <h5 className="text-white">{doctor.name}</h5>
                                    <h6 className="text-navText">{doctor.specialist.toLocaleUpperCase()}</h6>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Link to={`/doctors/${doctor.authId}`}><img className="cursor-pointer w-10 h-10 mr-2" src="/media/Patient/info3.png" alt="Profile" /></Link>
                                    {!slotLoading && <img onClick={() => slotHandler(doctor.authId, doctor.name, doctor.city, doctor.specialist)} className="cursor-pointer w-10 h-10" src="/media/Patient/slot2.png" alt="Prescription" />}
                                    {slotLoading && <div className="flex justify-center items-center"><LineWave visible={true} height="60" width="60" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchDoctor;