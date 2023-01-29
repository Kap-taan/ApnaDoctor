import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div className="flex mb-12">
            <div className="flex flex-col justify-center">
                <span className="text-navText font-bold uppercase text-xs mb-6">Govern the clock, not be governed by it.</span>
                <span className="text-white text-5xl font-bold mb-6">Simple Health experience<br /> for everyone</span>
                <span className="text-navText mb-10">Track your treatment, get better result, and be the best version of you, less thinking, more saving</span>
                <div>
                    <Link to="/signup" className="py-3 px-6 bg-primary rounded-full text-white">Get Started</Link>
                    <a className="border-2 border-btnBorder py-3 px-6 rounded-full text-white ml-6" href="#">Download App</a>
                </div>
            </div>
            <div className="flex justify-center items-center p-20">
                <img className="flex justify-center items-center w-96" src="/media/general/poster.svg" alt="Poster" />
            </div>
        </div>
    );
}

export default Main;