import React, { useEffect, useState } from "react";
import { db } from '../../data/firebase';
import { onSnapshot, doc } from 'firebase/firestore';

const Stats = () => {

    const [users, setUsers] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "generalInfo", "users"), (doc) => {
            setUsers(doc.data().count);
        });


        return () => unsub();
    }, [])

    return (
        <div className="grid grid-cols-4 gap-10 mb-16">
            <div className="p-8">
                <img className="w-10 mb-6" src="/media/general/user.svg" alt="User" />
                <h1 className="text-6xl font-bold text-white pb-6 border-b border-border mb-10">{users}</h1>
                <h5 className="text-white mb-6">Happy Users</h5>
                <p className="text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
            </div>
            <div className="p-8">
                <img className="w-10 mb-6" src="/media/general/download1.svg" alt="User" />
                <h1 className="text-6xl font-bold text-white pb-6 border-b border-border mb-10">0</h1>
                <h5 className="text-white mb-6">Downloads</h5>
                <p className="text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
            </div>
            <div className="p-8">
                <img className="w-10 mb-6" src="/media/general/cities.svg" alt="User" />
                <h1 className="text-6xl font-bold text-white pb-6 border-b border-border mb-10">0</h1>
                <h5 className="text-white mb-6">Cities</h5>
                <p className="text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
            </div>
            <div className="p-8">
                <img className="w-10 mb-6" src="/media/general/doctor.svg" alt="User" />
                <h1 className="text-6xl font-bold text-white pb-6 border-b border-border mb-10">0</h1>
                <h5 className="text-white mb-6">Doctors</h5>
                <p className="text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
            </div>
        </div>
    );
}

export default Stats