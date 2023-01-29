import { async } from "@firebase/util";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../data/firebase";
import { RevolvingDot } from 'react-loader-spinner'
import Navbar from "../Navbar";

const ChangeLocation = () => {

    const { user } = UserAuth();

    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Do there
        const enteredCity = e.target.location.value;
        console.log(enteredCity);
        const docRef = doc(db, "patients", user.uid)
        await updateDoc(docRef, {
            location: enteredCity
        })
        console.log('Location is changed successfully');
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
                    <h4 className="text-white font-bold text-2xl pb-5 mb-5 border-b border-navText">Update Location</h4>
                    {loading && <div className="mb-4 flex justify-center items-center"><RevolvingDot color="#EC653D" height="100" width="100%" radius="15" ariaLabel="loading" wrapperStyle wrapperClass /></div>}
                    <div>
                        <form onSubmit={submitHandler}>
                            <div className="flex flex-col mb-8">
                                <label className="text-infoLabel mb-3">Change Location</label>
                                <select name="location" className="w-96 border border-btnBorder text-white bg-infoField px-4 py-2 rounded-lg ">
                                    {cities.length > 0 && cities.map(city => (
                                        <option key={city.id} value={city.name}>{city.name.toLocaleUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button type="submit" className="bg-primary text-white flex justify-center items-center py-2 px-7 rounded-full cursor-pointer w-full">Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangeLocation;