import React from "react";
import { Link } from "react-router-dom";

const Options = () => {

    return (
        <div className=" mb-8 grid grid-cols-4 gap-8">
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/slot1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">Appointment</h5>
                <Link to="/consult" className="text-white font-bold" href="#">Consult</Link>
            </div>
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/info1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">Patient Details</h5>
                <Link to="/view" className="text-white font-bold">View</Link>
            </div>
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/search1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">Search</h5>
                <Link to='/searchpatient' className="text-white font-bold">Search</Link>
            </div>
            <div className="p-8 shadow-lg bg-cardBackground rounded-2xl transform hover:scale-110 transition ease-out duration-50">
                <img className="w-10 mb-5" src="/media/Patient/list1.png" alt="Slot" />
                <h5 className="text-cardSmallFont mb-5">History</h5>
                <a className="text-white font-bold" href="#">Show</a>
            </div>
        </div>
    );
}

export default Options;