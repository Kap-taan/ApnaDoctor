import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../data/firebase";
import { RevolvingDot } from 'react-loader-spinner'
import Navbar from "../Navbar";

const InfoForm = () => {

    const { user } = UserAuth();

    const [cities, setCities] = useState([]);
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Check anything is empty
        if (name === '' || dob === '') {
            return;
        }

        const info = {
            name,
            dob: new Date(dob),
            location: e.target.location.value,
            gender: e.target.gender.value,
            authId: user.uid,
            doctorsIds: [],
            appointments: []
        }

        const docRef = doc(db, "patients", user.uid);
        await setDoc(docRef, info);
        console.log('Information is filled successfully');
        setLoading(false);
        navigate('/dashboard');
    }

    const getCities = async () => {
        const docRef = collection(db, "cities");
        const docsSnap = await getDocs(docRef);
        let tempCities = [];
        docsSnap.forEach(doc => {
            tempCities = [...tempCities, { ...doc.data(), id: doc.id }];
        })
        setCities(tempCities);

    }

    useEffect(() => {
        getCities();
    }, [])

    return (
        <>
            <Navbar />
            <div className=" flex justify-center">
                <div className="rounded-sm bg-infoBackground py-14 px-20">
                    <h4 className="text-white font-bold text-2xl pb-5 mb-5 border-b border-navText">Personal Information</h4>
                    {loading && <div className="mb-4"><RevolvingDot color="#EC653D" height="100" width="100%" radius="15" ariaLabel="loading" wrapperStyle wrapperClass /></div>}
                    <div>
                        <form onSubmit={submitHandler}>
                            <div className="flex flex-col mb-8">
                                <label className="text-infoLabel mb-3">Your Name</label>
                                <input className="border border-btnBorder px-4 py-2 text-white rounded-lg bg-infoField" type="text" alt="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
                            </div>
                            <div className="grid grid-cols-2 gap-7 mb-8">
                                <div className="">
                                    <label className="text-infoLabel">Date of Birth</label>
                                    <input className="border border-btnBorder text-white bg-infoField ml-3 px-4 py-2 rounded-lg w-48" type="date" alt="DOB" value={dob} onChange={e => setDob(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-infoLabel">Location</label>
                                    {/* <input className="border border-btnBorder text-white bg-infoField ml-3 px-4 py-2 rounded-lg w-48" type="text" alt="Location" value={location} onChange={e => setLocation(e.target.value)} /> */}
                                    <select name="location" className="border border-btnBorder text-white bg-infoField ml-3 px-4 py-2 rounded-lg w-48">
                                        {cities.length > 0 && cities.map(city => (
                                            <option key={city.id} value={city.name}>{city.name.toLocaleUpperCase()}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col mb-12">
                                <label className="text-infoLabel mb-3">Gender</label>
                                <select name="gender" className="border border-btnBorder text-white bg-infoField px-4 py-2 rounded-lg w-48">

                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" className="bg-primary text-white flex justify-center items-center py-2 px-7 rounded-full cursor-pointer w-full">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoForm;



