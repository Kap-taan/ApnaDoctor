import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from '../../../data/firebase';
import { ColorRing } from 'react-loader-spinner';
import { Link } from "react-router-dom";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {
        setLoading(true);
        const docRef = collection(db, "categories");
        const docsSnap = await getDocs(docRef);
        let tempCategories = [];
        docsSnap.forEach(doc => {
            tempCategories = [...tempCategories, { ...doc.data(), id: doc.id }]
        })
        setCategories(tempCategories);
        setLoading(false);
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="mb-8">
            <h5 className="mb-8 text-lg">Categories</h5>
            <div className="grid grid-cols-4 gap-8">
                {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                {categories.length > 0 && categories.map(category => (
                    <Link key={category.id} to={`/categories/${category.type}`} className="flex flex-col items-center justify-center p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                        <img className="w-10 mb-5" src={category.img} alt="Slot" />
                        <div className="text-white text-xs font-bold">{category.type.toLocaleUpperCase()}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;

// <FallingLines color="#EC653D" width="100" height="100" visible={true} ariaLabel='falling-lines-loading' />