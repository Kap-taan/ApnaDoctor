import { collection, doc, getDoc, query, getDocs, where, runTransaction, writeBatch, increment } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { db, storage } from "../../../data/firebase";
import Navbar from '../Navbar';
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectedDoctor } from "../../../context/DoctorContext";
import { connectStorageEmulator, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { CurrentUser } from "../../../context/UserContext";



const Slot = () => {

    const { user } = UserAuth();

    const [doctors, setDoctors] = useState({});
    const [location, setLocation] = useState('');
    const [stage, setStage] = useState(1);
    const [dates, setDates] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);

    // context
    const { doctor, dispatch, doctorName } = SelectedDoctor();

    // Loading states
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [dateLoading, setDateLoading] = useState(false);
    const [slotLoading, setSlotLoading] = useState(false);
    const [completeLoading, setCompleteLoading] = useState(false);


    // Selected States
    const [selectedDate, setSelectedDate] = useState();
    const [selectedSlot, setSelectedSlot] = useState();
    const [problems, setProblems] = useState();
    const [uploadedFile, setUploadedFile] = useState(null);
    const [age, setAge] = useState();


    // File states
    const [imageUpload, setImageUpload] = useState(null);

    // Navigate
    const navigate = useNavigate();

    // Secondary States
    const [doctorSlots, setDoctorSlots] = useState();
    const [limit, setLimit] = useState();

    // Getting the age
    const gettingAge = (dob) => {
        console.log(dob);
        let birthDate = new Date(dob.seconds * 1000);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const getDoctorsInfo = async () => {
        setLoading(true);
        if (user) {
            try {
                const docRef = doc(db, "patients", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    let tempDoctors = docSnap.data().doctorsIds.filter(doctor => doctor.location === docSnap.data().location);
                    setDoctors(tempDoctors);
                    setLoading(false);
                    setLocation(docSnap.data().location);
                    console.log(tempDoctors);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        }
    }

    const selectDoctorHandler = async (e) => {
        e.preventDefault();
        console.log(doctors);
        const name = doctors.filter(doctor => doctor.id === e.target.doctorId.value)[0].name;
        console.log(name, e.target.doctorId.value);
        dispatch({ type: 'ADD', payload: { id: e.target.doctorId.value, name: name } });
        await makingDates(e.target.doctorId.value);
        setStage(2);
    }

    const selectDateHandler = async (e) => {
        e.preventDefault();
        setSelectedDate(new Date(e.target.date.value));
        await makingSlots(doctor, new Date(e.target.date.value));
        // setSelectedSlot(e.target.time.value);
        setStage(3);
    }

    const selectTimeHandler = (e) => {
        e.preventDefault();
        setSelectedSlot(e.target.time.value);
        setStage(4);
    }

    const problemHandler = (e) => {
        e.preventDefault();
        setProblems(e.target.problems.value.split(','));
        setStage(5);
    }

    const fileUploadHandler = async (e) => {
        e.preventDefault();
        setImageUploading(true);
        const patient = JSON.parse(localStorage.getItem('patient'));
        const tempAge = gettingAge(patient.dob);
        setAge(tempAge);
        let url = ""
        if (imageUpload !== null) {
            // Making the Image ref
            const imageRef = ref(storage, `reports/${imageUpload.name + v4()}`)
            const response = await uploadBytes(imageRef, imageUpload)
            url = await getDownloadURL(response.ref)
            setUploadedFile(url);
            console.log('Uploaded');
        }
        console.log(doctorName, doctor);
        const appointment = {
            date: selectedDate,
            slot: selectedSlot,
            doctorId: doctor,
            doctorName: doctorName,
            patientName: patient.name,
            patientAge: tempAge,
            patientId: user.uid,
            createdAt: new Date(),
            problems: problems,
            reports: url
        }
        console.log(appointment);
        // Batch write
        let tempDocument = selectedDate.toLocaleDateString().split('/');
        tempDocument = `${tempDocument[0]}${tempDocument[1]}${tempDocument[2]}`;
        const id = new Date().getTime().toString();
        const idx = doctorSlots.indexOf(selectedSlot);
        console.log(idx);
        // Increment the counter
        // const doctorRef = doc(db, "doctors", doctor);

        // const doctorRef = doc(db, "offlineSlots", tempDocument);
        // const response = await getDoc(doctorRef);
        // console.log(response.data()[doctor]);

        try {
            await runTransaction(db, async (transaction) => {
                const doctorRef = doc(db, "offlineSlots", tempDocument);
                const sfDoc = await transaction.get(doctorRef);
                if (!sfDoc.exists()) {
                    throw "Document does not exist!";
                }

                // const newPopulation = sfDoc.data().population + 1;
                let tempData = sfDoc.data()[doctor];
                for (const key in tempData) {
                    if (key == "13-14") {
                        tempData[key] = tempData[key] + 1;
                    }
                }
                transaction.update(doctorRef, {
                    [doctor]: tempData
                });
            });
            console.log("Transaction successfully committed!");
        } catch (e) {
            console.log("Transaction failed: ", e);
            setImageUploading(false);
        }

        const batch = writeBatch(db);
        const appointmentRef = doc(db, "appointments", id);
        console.log(appointment);
        console.log(id);
        batch.set(appointmentRef, appointment);
        const patientAppointmentRef = doc(db, "patients", user.uid);
        batch.update(patientAppointmentRef, {
            appointments: [...patient.appointments, {
                appointmentId: id,
                date: selectedDate,
                slot: selectedSlot,
                doctorId: doctor,
                doctorName: doctorName
            }]
        })
        const doctorRef = doc(db, "doctors", doctor);
        batch.update(doctorRef, {
            noOfBookings: increment(1)
        })
        batch.commit()
        setStage(6);
        // dispatch({ type: 'REMOVE' })
        setImageUploading(false);
    }

    const completeHandler = () => {
        dispatch({ type: 'REMOVE' })
        navigate('/dashboard');
    }

    const makingSlots = async (id, date) => {
        // Getting the slots available
        setSlotLoading(true);
        let tempDocument = date.toLocaleDateString().split('/');
        tempDocument = `${tempDocument[0]}${tempDocument[1]}${tempDocument[2]}`;
        const slotRef = doc(db, "offlineSlots", tempDocument);
        const slotSnap = await getDoc(slotRef);
        let tempSlots = [];
        if (slotSnap.exists()) {
            // Day exist
            let data = [];
            if (slotSnap.data()[id]) {
                data = doctorSlots.filter(slot => {
                    return slotSnap.data()[id][slot] < limit
                })
                setTimeSlots(data);
                setSlotLoading(false);
            } else {
                // A new field is to be added
                // Transaction is to be made
                try {
                    await runTransaction(db, async (transaction) => {
                        const slotRef = doc(db, "offlineSlots", tempDocument);
                        const sfDoc = await transaction.get(slotRef);
                        if (!sfDoc.exists()) {
                            throw "Document does not exist!";
                        }
                        let tempSlotes = {};
                        doctorSlots.map(slot => {
                            tempSlotes = { ...tempSlotes, [slot]: 0 }
                        })
                        transaction.update(slotRef, { [id]: tempSlotes });

                        setTimeSlots(doctorSlots)
                        setSlotLoading(false);
                    })
                } catch (error) {
                    console.log('Transaction failed : ', error);
                    setSlotLoading(false);
                }
            }
        } else {
            // Add the new document
            try {
                await runTransaction(db, async (transaction) => {
                    const sfDocRef = doc(db, "offlineSlots", tempDocument)
                    const sfDoc = await transaction.get(sfDocRef);
                    if (sfDoc.exists()) {
                        throw "Document already exist!";
                    }
                    transaction.set(sfDocRef, {});
                });
                console.log("Transaction successfully committed!");
                makingSlots(id, date);
            } catch (error) {
                console.log('Transaction failed : ', error);
                setSlotLoading(false);
            }
        }
    }

    const makingDates = async (id) => {
        setDateLoading(true);
        let tempDates = [];
        const today = new Date();
        let count;
        // Get the offdays of doctor
        const docRef = doc(db, "leavedays", id);
        const docSnap = await getDoc(docRef);
        let excludeDays = []
        if (docSnap.exists()) {
            docSnap.data().days.map(day => {
                excludeDays = [...excludeDays, new Date((day.seconds * 1000)).toDateString()]
            })
            count = docSnap.data().limit;
        }
        for (let index = 1; index <= count; index++) {
            const date = new Date(today.getTime() + (index * (24 * 60 * 60 * 1000)));
            if (date.getDay() && !excludeDays.includes(date.toDateString()))
                tempDates = [...tempDates, date];
            else
                count++;
        }
        setDates(tempDates);
        console.log(docSnap.data());
        setDoctorSlots(docSnap.data().slots);
        setLimit(docSnap.data().limit);
        setDateLoading(false);

    }

    const predefinedDoctor = async (doctor) => {
        await makingDates(doctor);
        setStage(2);
    }

    const chooseAnotherDayHandler = async () => {
        setSelectedDate('');
        setStage(2);
    }

    useEffect(() => {
        if (doctor) {
            predefinedDoctor(doctor);
            return;
        }
        getDoctorsInfo();
    }, [user])

    return (
        <>
            <Navbar />
            <div className="">
                <h3 className="text-white text-3xl pb-6">Slot Booking</h3>
                <div className="grid grid-cols-3">
                    <div className="col-span-1 text-white border-t border-r border-borderColor p-8">
                        <div className="flex items-center justify-end mb-12">
                            <div>
                                <h4 className="text-white font-bold mr-2">Select Doctor</h4>
                            </div>
                            <img className={`bg-${stage === 1 ? 'primary' : ''} w-12 h-12 border rounded-full p-1.5`} src="/media/Patient/name.svg" alt="Name" />
                        </div>
                        <div className="flex items-center justify-end mb-12">
                            <div>
                                <h4 className="text-white font-bold mr-2">Date</h4>
                            </div>
                            <img className={`bg-${stage === 2 || stage === 3 ? 'primary' : ''} w-12 h-12 border rounded-full p-1.5`} src="/media/Patient/date.svg" alt="Name" />
                        </div>
                        <div className="flex items-center justify-end mb-12">
                            <div>
                                <h4 className="text-white font-bold mr-2">Problems</h4>
                            </div>
                            <img className={`bg-${stage === 4 ? 'primary' : ''} w-12 h-12 border rounded-full p-1.5`} src="/media/Patient/problem.svg" alt="Name" />
                        </div>
                        <div className="flex items-center justify-end mb-12">
                            <div>
                                <h4 className="text-white font-bold mr-2">Reports</h4>
                            </div>
                            <img className={`bg-${stage === 5 ? 'primary' : ''} w-12 h-12 border rounded-full p-1.5`} src="/media/Patient/report.svg" alt="Name" />
                        </div>
                        <div className="flex items-center justify-end mb-12">
                            <div>
                                <h4 className="text-white font-bold mr-2">Complete</h4>
                            </div>
                            <img className={`bg-${stage === 6 ? 'primary' : ''} w-12 h-12 border rounded-full p-1.5`} src="/media/Patient/complete.svg" alt="Name" />
                        </div>
                    </div>
                    <div className="col-span-2 border-t border-borderColor p-8">

                        {stage === 1 && <form onSubmit={selectDoctorHandler}>
                            <div className="mb-8">
                                <h4 className="text-white text-2xl font-bold pb-8 border-b border-borderColor">Choose your doctor</h4>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-white mb-4">Select your doctor</label>
                                {loading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}

                                {!loading && doctors.length > 0 && <select name="doctorId" className="mb-8 pl-5 py-3 rounded-lg font-bold bg-bodyBG border border-navText text-white">
                                    {doctors.length > 0 && doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                                    ))}

                                </select>}
                                {!loading && doctors.length === 0 && <div className="text-center text-primary">You haven't consulted with any doctor in this city</div>}
                                <div className="flex justify-end mb-7">
                                    {dateLoading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                                    {!dateLoading && doctors.length !== 0 && <button type="submit" className="bg-primary text-white py-2 px-8 rounded-full flex justify-center items-center cursor-pointer">Next</button>}
                                </div>

                            </div>
                        </form>}
                        {stage === 2 && <form onSubmit={selectDateHandler}>
                            <div className="mb-8">
                                <h4 className="text-white text-2xl font-bold pb-8 border-b border-borderColor">Choose your timings</h4>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-white mb-4">Select Date</label>
                                <div className="grid grid-cols-5 gap-10">
                                    {!loading && dates.length > 0 && <select name="date" className="appearance-none col-span-4 mb-8 pl-5 py-3 rounded-lg font-bold bg-bodyBG border border-navText text-white">
                                        {dates.length > 0 && dates.map(date => (
                                            <option key={date.toDateString()} value={date.toDateString()}>{date.toDateString()}</option>
                                        ))}

                                    </select>}
                                </div>
                                <div className="flex justify-end mb-7">
                                    {slotLoading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                                    {!slotLoading && <button type="submit" className="bg-primary text-white py-2 px-8 rounded-full flex justify-center items-center cursor-pointer">Next</button>}
                                </div>

                            </div>
                        </form>}
                        {stage === 3 && <form onSubmit={selectTimeHandler}>
                            <div className="mb-8">
                                <h4 className="text-white text-2xl font-bold pb-8 border-b border-borderColor">Choose your timings</h4>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-white mb-4">Select Time slot</label>
                                <div className="grid grid-cols-5 gap-10">
                                    {!loading && timeSlots.length > 0 && <select name="time" className="appearance-none col-span-1 mb-8 pl-5 py-3 rounded-lg font-bold bg-bodyBG border border-navText text-white">
                                        {timeSlots.length > 0 && timeSlots.map(timeSlot => (
                                            <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
                                        ))}
                                    </select>}
                                    {!slotLoading && timeSlots.length === 0 && <div className="w-full text-red-500">No slots</div>}
                                </div>
                                <div className="flex justify-end mb-7">
                                    {timeSlots.length > 0 && <button type="submit" className="bg-primary text-white py-2 px-8 rounded-full flex justify-center items-center cursor-pointer">Next</button>}
                                </div>

                            </div>
                            {!slotLoading && timeSlots.length === 0 && <button onClick={chooseAnotherDayHandler} className="bg-red-700 text-white py-2 px-8 rounded-full flex justify-center items-center cursor-pointer">Choose another date</button>}
                        </form>}
                        {stage === 4 && <form onSubmit={problemHandler}>
                            <div className="mb-8">
                                <h4 className="text-white text-2xl font-bold pb-8 border-b border-borderColor">Mention problems</h4>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-white mb-4">Mention your problems</label>

                                {!loading && <textarea name="problems" placeholder="Separated by commas" className="appearance-none mb-8 pl-5 py-3 rounded-lg font-bold bg-bodyBG border border-navText text-white">

                                </textarea>}


                                <div className="flex justify-end mb-7">
                                    <button type="submit" className="bg-primary text-white py-2 px-8 rounded-full flex justify-center items-center cursor-pointer">Next</button>
                                </div>

                            </div>
                        </form>}
                        {stage === 5 && <form onSubmit={fileUploadHandler}>
                            <div className="mb-8">
                                <h4 className="text-white text-2xl font-bold pb-8 border-b border-borderColor">Upload Reports</h4>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-white mb-4">Upload your reports</label>

                                {!loading && <input onChange={e => setImageUpload(e.target.files[0])} type="file" name="problems" placeholder="Separated by commas" className="appearance-none mb-8 pl-5 py-3 rounded-lg font-bold bg-bodyBG border border-navText text-white">

                                </input>}


                                <div className="flex justify-end mb-7">
                                    {!imageUploading && <button type="submit" className="bg-primary text-white py-2 px-8 rounded-full flex justify-center items-center cursor-pointer">Next</button>}
                                    {imageUploading && <div className="flex justify-center items-center"><ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} /></div>}
                                </div>

                            </div>
                        </form>}
                        {stage === 6 && <>
                            <div className="mb-8">
                                <h4 className="text-white text-2xl font-bold pb-8 border-b border-borderColor">Your slot is booked successfully</h4>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between px-10 mb-7">
                                        <div>
                                            <h5 className="text-navText">Date</h5>
                                            <h4 className="text-white">{selectedDate.toDateString()}</h4>
                                        </div>
                                        <div>
                                            <h5 className="text-navText">Time Slot</h5>
                                            <h4 className="text-white">{selectedSlot}</h4>
                                        </div>
                                    </div>
                                    <div className="flex justify-between px-10 mb-7">
                                        <div>
                                            <h5 className="text-navText">Problems</h5>
                                            {problems.length > 0 && problems.map(problem => (
                                                <h5 key={problem} className="text-white">{problem}</h5>
                                            ))}

                                        </div>
                                        <div>
                                            <h5 className="text-navText">Appointment with</h5>
                                            <h4 className="text-white">{doctorName}</h4>
                                        </div>


                                    </div>
                                    <div className="flex justify-end mb-7">
                                        <button onClick={completeHandler} className="bg-primary text-white py-2 px-8 rounded-full flex justify-center items-center cursor-pointer">Complete</button>
                                    </div>
                                </div>


                            </div>
                        </>}
                        {stage === 1 && <div className="flex justify-center items-center"><Link to={`/${location}/searchdoctors`} className="text-navText text-center">Want to prefer some other doctor <span className="italic cursor-pointer text-primary">Click Here</span></Link></div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slot;