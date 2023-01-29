import { collection, getDocs, orderBy, query, where, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../../../data/firebase";
import Navbar from '../Navbar';
import { ColorRing, LineWave } from "react-loader-spinner";
import { SelectedDoctor } from "../../../context/DoctorContext";
import { CurrentUser } from "../../../context/UserContext";
import { UserAuth } from "../../../context/AuthContext";

const SingleCategory = () => {

    const { category } = useParams();

    const { user } = UserAuth();

    const [doctors, setDoctors] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [doctor, setDoctor] = useState('');

    const { dispatch } = SelectedDoctor();
    const { patient } = CurrentUser();

    const navigate = useNavigate();

    const [slotLoading, setSlotLoading] = useState(false);

    const searchHandler = (e) => {
        console.log(e.target.value);
        setDoctor(e.target.value);
        let tempDoctors = allDoctors.filter(doctor => doctor.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
        setDoctors(tempDoctors);
    }

    const queryHandler = (e) => {
        console.log(doctor);
    }

    const getCategoryData = async () => {
        setLoading(true);
        const docRef = query(collection(db, "doctors"), where("specialist", "==", category), orderBy("noOfBookings", "desc"));
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
        dispatch({ type: 'ADD', payload: { id: id, name: name } });
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
        getCategoryData();
    }, [])

    return (
        <>
            <Navbar />
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-3xl font-bold mb-10">{category.toLocaleUpperCase()}</h3>
                    <div className="flex justify-center pb-5">
                        <input value={doctor} onChange={searchHandler} className="py-3 px-5 w-72 rounded-l-full bg-indigo-50" type="text" placeholder="Search Doctors" />
                        <button onClick={queryHandler} className="bg-primary flex justify-center items-center py-2 px-5 rounded-r-full cursor-pointer text-white">Search More</button>
                    </div>
                </div>

                <div className="p-10 grid grid-cols-4 gap-10">
                    {!loading && doctors.length === 0 && <div><h4 className="text-red-400 text-center">No Doctors Available</h4></div>}
                    {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                    {doctors.length > 0 && doctors.map(doctor => (
                        <div key={doctor.authId} className="text-white flex flex-col justify-center items-center p-5 bg-infoBackground rounded-lg ">
                            <img className="w-36 mb-2" src="/media/Patient/doctor.png" alt="Doctor" />
                            <h3 className="font-bold text-lg">{doctor.name}</h3>
                            <h4 className="text-navText">{doctor.city.toLocaleUpperCase()}</h4>
                            <div className="flex">
                                <Link to={`/doctors/${doctor.authId}`}><img className="cursor-pointer w-10 mr-2" src="/media/Patient/info3.png" alt="Profile" /></Link>
                                {!slotLoading && <img onClick={() => slotHandler(doctor.authId, doctor.name, doctor.city, doctor.specialist)} className="cursor-pointer w-10 h-10" src="/media/Patient/slot2.png" alt="Prescription" />}
                                {slotLoading && <div className="flex justify-center items-center"><LineWave visible={true} height="60" width="60" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SingleCategory;

