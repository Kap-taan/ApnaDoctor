import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../data/firebase";
import Navbar from "../Navbar";
import { RevolvingDot } from 'react-loader-spinner'
import { format } from 'date-fns';
import moment from "moment";

const PersonalInfo = () => {

    const { user } = UserAuth();

    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getInfo = async () => {
        setLoading(true);
        if (user.uid) {
            const docRef = doc(db, "patients", user.uid);
            const docSnap = await getDoc(docRef);
            const today = docSnap.data().dob.toDate();
            const tempDob = moment(today).format("YYYY-MM-DD");
            setDob(tempDob);
            setName(docSnap.data().name);
            setGender(docSnap.data().gender);

            setLoading(false);
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const info = {
            name,
            gender,
            dob: new Date(dob)
        }

        await updateDoc(doc(db, "patients", user.uid), info);
        alert('Updated Successfully');
        setLoading(false);
        navigate('/dashboard');
    }

    useEffect(() => {
        getInfo();
    }, [user])

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
                                <input className="border border-btnBorder px-4 py-2 text-white rounded-lg bg-infoField w-96" type="text" alt="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
                            </div>
                            <div className="flex flex-col mb-8">
                                {/* <div className=""> */}
                                <label className="text-infoLabel mb-3">Date of Birth</label>
                                <input className="border border-btnBorder text-white bg-infoField px-4 py-2 rounded-lg w-96" type="date" alt="DOB" value={dob} onChange={e => setDob(e.target.value)} />
                                {/* </div> */}
                            </div>
                            <div className="flex flex-col mb-12">
                                <label className="text-infoLabel mb-3">Gender</label>
                                <select value={gender} onChange={e => setGender(e.target.value)} name="gender" className="border border-btnBorder text-white bg-infoField px-4 py-2 rounded-lg w-48">

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

export default PersonalInfo;