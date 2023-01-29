import React from "react";

const Features = () => {
    return (
        <div className="flex flex-col justify-center items-center mb-20" id="features">
            {/* <div className="flex flex-col items-center mb-10">
                <h2 className="text-4xl font-bold mb-4 text-white">Features</h2>
            </div> */}
            <div className="grid grid-cols-3">
                <div className="col-span-1 grid grid-rows-3">
                    <div className="p-14">
                        <div className="mb-10">
                            <span className="py-1 px-3 bg-bubble-200 rounded-full text-white">01</span>
                        </div>
                        <div className="mb-10">
                            <h4 className="text-white">Intuitive and clean design</h4>
                        </div>
                        <div>
                            <p className="text-navText">Track your treatment, get better results and be the best version of you</p>
                        </div>
                    </div>
                    <div className="p-14">
                        <div className="mb-10">
                            <span className="py-1 px-3 bg-bubble-300 rounded-full text-white">02</span>
                        </div>
                        <div className="mb-10">
                            <h4 className="text-white">Simplicity in Slot Booking</h4>
                        </div>
                        <div>
                            <p className="text-navText">Track your treatment, get better results and be the best version of you</p>
                        </div>
                    </div>
                    <div className="p-14">
                        <div className="mb-10">
                            <span className="py-1 px-3 bg-bubble-400 rounded-full text-white">03</span>
                        </div>
                        <div className="mb-10">
                            <h4 className="text-white">Record of Every Appointment</h4>
                        </div>
                        <div>
                            <p className="text-navText">Track your treatment, get better results and be the best version of you</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 p-20 flex justify-end items-center">
                    <img className="w-11/12 " src="media/general/features.svg" alt="Features" />
                </div>
            </div>
        </div>
    )
}

export default Features