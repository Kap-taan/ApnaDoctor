import React from "react";
import { ColorRing } from 'react-loader-spinner';
import { Link } from "react-router-dom";

const Location = ({ doctorName, doctorLocation }) => {
    return (
        <div className="mb-10 rounded-lg p-8 bg-cardBackground">
            <div className="mb-6">
                <img className="w-10 mb-4" src="/media/Patient/location.png" alt="Location" />
                {doctorLocation && <h4 className="text-lg font-bold">{doctorLocation.toLocaleUpperCase()}</h4>}
                {!doctorLocation && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <span className="italic">Good Morning</span>
                    <span className="block font-bold text-xl">{doctorName}</span>
                </div>
                {/* <Link to="/changelocation" className="bg-primary flex justify-center items-center py-2 px-5 rounded-full cursor-pointer">
                    <span className="font-bold">Change City</span>
                </Link> */}
            </div>
        </div>
    );
}

export default Location;