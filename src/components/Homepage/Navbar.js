import React, { useRef } from "react";
import { Link as Rou } from "react-router-dom";
import { Link } from "react-scroll";

const Navbar = () => {

    const mobileNarbar = useRef();
    const barRef = useRef();

    const menuHandler = () => {

    }


    return (
        <nav className="text-white flex flex-col  lg:flex-row justify-between items-center mb-12">
            <div className="flex justify-between items-center w-full">
                <Rou to="/" className="flex items-center">
                    <img className="w-10" src="/media/general/startup.svg" alt="Logo" />
                    <span className="font-bold ml-2 text-lg">Startup</span>
                </Rou>

                <div className="hidden lg:block space-x-16 text-navText">
                    <Link to="steps" smooth={true} duration={1000} className="text-sm hover:text-hoverText cursor-pointer">Steps</Link>
                    <Link to="features" smooth={true} duration={1000} className="text-sm hover:text-hoverText cursor-pointer">Features</Link>
                    {/* <a className="text-sm hover:text-hoverText" href="#">Find Doctors</a> */}
                    <a className="text-sm hover:text-hoverText" href="#">Download</a>
                    <Link to="aboutus" smooth={true} duration={1000} className="text-sm hover:text-hoverText cursor-pointer">About us</Link>
                    {/* <a className="text-sm hover:text-hoverText" href="#">Contact us</a> */}
                </div>
                <div className="hidden lg:block">
                    <Rou className="border-2 border-btnBorder py-2 px-6 rounded-full flex justify-center items-center cursor-pointer" to="/login">Log In</Rou>
                </div>

                <div className="cursor-pointer lg:hidden" onClick={menuHandler} ref={barRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </div>

            </div>


        </nav>
    );
}

export default Navbar;