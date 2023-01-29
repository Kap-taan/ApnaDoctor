import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { RevolvingDot } from 'react-loader-spinner'
import Navbar from "./Navbar";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const { forgotPassword } = UserAuth();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await forgotPassword(email);
            setMessage('Check your inbox for further instructions')
            setLoading(false);
        } catch (error) {
            setLoading(false);
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


    return (
        <div>
            <Navbar />
            <div className=" flex justify-center text-white">
                <div className="py-8 px-10 w-5/12">
                    <div className="flex flex-col justify-center items-center text-4xl font-semibold m-12">
                        <h2 className="mb-4">Forgot Password</h2>
                        {loading && <RevolvingDot color="#EC653D" height="100" width="100%" radius="15" ariaLabel="loading" wrapperStyle wrapperClass />}
                        {error && <p className="text-red-700 text-sm">{error}</p>}
                        {message && <p className="text-green-700 text-sm">{message}</p>}
                    </div>
                    <form onSubmit={handleForgotPassword}>
                        <div className="flex flex-col mb-10">
                            <label className="text-white mb-2">Email</label>
                            <input required className="px-2 rounded-md py-2 bg-inputContainer border border-inputBorder" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="w-full rounded-md bg-primary mb-12">
                            <button className=" w-full p-2" type="submit">Reset Password</button>
                        </div>
                    </form>
                    {message && <Link to="/login" className="cursor-pointer text-center">
                        <p className="mb-8 text-navText text-lg">Login Again</p>
                    </Link>}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;