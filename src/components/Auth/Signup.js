import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RevolvingDot } from 'react-loader-spinner'
import { UserAuth } from "../../context/AuthContext";
import { db } from '../../data/firebase';
import { doc, increment, writeBatch } from "firebase/firestore";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { passwordSignUp, user } = UserAuth();

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setLoading(false);
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await passwordSignUp(email, password);
            const user = response.user;

            console.log(user.uid);

            const batch = writeBatch(db);

            const userCountRef = doc(db, "generalInfo", "users");
            batch.update(userCountRef, {
                count: increment(1)
            })

            // const userRef = doc(collection(db, "users"))
            const userRef = doc(db, "users", user.uid);
            batch.set(userRef, {
                authId: user.uid,
                type: 'patient'
            })

            await batch.commit();

            setLoading(false);
            setError('');
            navigate('/dashboard')
        } catch (error) {
            setLoading(false);
            console.log(error);
            let errorMessage = [];
            errorMessage = error.message.split('/')[1].split(')')[0].split('-');
            let errorString = '';
            errorMessage.forEach(str => {
                errorString += str;
                errorString += ' ';
            })
            setError(errorString.toLocaleUpperCase());
        }
    }

    useEffect(() => {
        if (user !== null) {

        }
    }, [user])

    return (
        <div>
            <Navbar />
            <div className=" flex justify-center text-white">
                <div className="py-8 px-10 w-5/12">
                    <div className="flex flex-col justify-center items-center text-4xl font-semibold m-12">
                        <h2 className="mb-4">Sign up to Startup</h2>
                        {loading && <RevolvingDot color="#EC653D" height="100" width="100%" radius="15" ariaLabel="loading" wrapperStyle wrapperClass />}
                        {error && <p className="text-red-700 text-sm">{error}</p>}
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col mb-5">
                            <label className="text-white mb-2">Email</label>
                            <input required className="px-2 rounded-md py-2 bg-inputContainer border border-inputBorder" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="text-white mb-2">Password</label>
                            <input required className="px-2 py-2 rounded-md bg-inputContainer border border-inputBorder" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="text-white mb-2">Confirm Password</label>
                            <input required className="px-2 py-2 rounded-md bg-inputContainer border border-inputBorder" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="w-full rounded-md bg-primary mb-8">
                            <button className=" w-full p-2" type="submit">Sign Up</button>
                        </div>
                        <div className="text-center text-navText">
                            <p>Already Signed up? <Link to="/login"><span className="text-primary">Login</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;