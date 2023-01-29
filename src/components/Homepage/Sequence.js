import React from "react";

const Sequence = () => {
    return (
        <div className="flex flex-col justify-center items-center text-white mb-32 pt-10" id="steps">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl font-bold mb-4">How it work</h2>
                <h5 className="text-navText">Here you can book slots for the appointment from your doctors</h5>
            </div>
            <div className="grid grid-cols-4">
                <div className="flex flex-col items-center">
                    <img className="w-26 h-20 mb-14" src="media/general/download.svg" alt="Icon" />
                    <p className="text-navText mb-10">Step 1</p>
                    <h4 className="mb-8">Download</h4>
                    <p className="text-center text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="w-26 h-20  mb-14" src="media/general/choose.svg" alt="Icon" />
                    <p className="text-navText mb-10">Step 2</p>
                    <h4 className="mb-8">Choose your Doctor</h4>
                    <p className="text-center text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="w-26 h-20  mb-14" src="media/general/book.svg" alt="Icon" />
                    <p className="text-navText mb-10">Step 3</p>
                    <h4 className="mb-8">Book a slot</h4>
                    <p className="text-center text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="flex flex-col items-center">
                    <img className="w-26 h-20  mb-14" src="media/general/appointment.svg" alt="Icon" />
                    <p className="text-navText mb-10">Step 4</p>
                    <h4 className="mb-8">Appointment Time</h4>
                    <p className="text-center text-navText">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </div>
    );
}

export default Sequence;