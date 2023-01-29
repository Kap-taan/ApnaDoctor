import React from "react";
import { Link } from "react-router-dom";

const Options = ({ patientLocation }) => {

    return (
        <div className=" mb-8 grid grid-cols-4 gap-8">
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/slot1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">Slot Booking</h5>
                <Link to="/slot" className="text-white font-bold" href="#">Book Now</Link>
            </div>
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/info1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">Person Details</h5>
                <Link to="/personaldetails" className="text-white font-bold">View</Link>
            </div>
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/search1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">Search Doctor</h5>
                <Link to={`/${patientLocation}/searchdoctors`} className="text-white font-bold">Search</Link>
            </div>
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/list1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">Notifications</h5>
                <a className="text-white font-bold" href="#">Show</a>
            </div>
        </div>
    );
}

export default Options;