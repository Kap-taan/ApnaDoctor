import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { user, logout } = UserAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="text-white flex justify-between items-center mb-14">
            <Link to="/" className="flex items-center">
                <img className="w-10" src="/media/general/startup.svg" alt="Logo" />
                <span className="font-bold ml-2 text-lg">Startup</span>
            </Link>
            <div className="flex space-x-16 text-navText">
                <a className="text-sm hover:text-hoverText" href="#">History</a>
                <a className="text-sm hover:text-hoverText" href="#">Categories</a>
                <a className="text-sm hover:text-hoverText" href="#">Download</a>
                {/* <a className="text-sm hover:text-hoverText" href="#">About us</a> */}
                <a className="text-sm hover:text-hoverText" href="#">Contact us</a>
            </div>
            <div>
                {!user && <Link className="border-2 border-btnBorder py-2 px-6 rounded-full flex justify-center items-center cursor-pointer" to="/signup">Signup</Link>}
                {user && <div className="border-2 border-btnBorder py-2 px-6 rounded-full flex justify-center items-center cursor-pointer" onClick={handleLogout}>Logout</div>}
            </div>
        </nav>
    );
}

export default Navbar;