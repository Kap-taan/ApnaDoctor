import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { RevolvingDot } from 'react-loader-spinner'
import Navbar from "./Navbar";

const Login = () => {

    const navigate = useNavigate();

    const { googleSignIn, passwordSignIn, user } = UserAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleSignIn = async () => {

        setLoading(true);
        setError('');

        try {
            await googleSignIn();
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

    useEffect(() => {

        if (user !== null) {
            setLoading(false);
            setError('');
            navigate('/dashboard')
        }


    }, [user])

    const handlePasswordLoginIn = async (e) => {

        e.preventDefault();

        setError('');

        setLoading(true);

        try {
            await passwordSignIn(email, password);
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
                        <h2 className="mb-4">Log in to Startup</h2>
                        {loading && <RevolvingDot color="#EC653D" height="100" width="100%" radius="15" ariaLabel="loading" wrapperStyle wrapperClass />}
                        {error && <p className="text-red-700 text-sm">{error}</p>}
                    </div>
                    <form onSubmit={handlePasswordLoginIn}>
                        <div className="flex flex-col mb-5">
                            <label className="text-white mb-2">Email</label>
                            <input required className="px-2 rounded-md py-2 bg-inputContainer border border-inputBorder" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="text-white mb-2">Password</label>
                            <input required className="px-2 py-2 rounded-md bg-inputContainer border border-inputBorder" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <Link to="/forgotpassword" className="cursor-pointer">
                            <p className="mb-8 text-navText">Forgot Password ?</p>
                        </Link>
                        <div className="w-full rounded-md bg-primary mb-12">
                            <button className=" w-full p-2" type="submit">Log In</button>
                        </div>
                    </form>
                    <div>
                        <div className="border border-inputBorder flex justify-between items-center p-2 cursor-pointer" onClick={handleGoogleSignIn}>
                            <div className="w-8">
                                <img src="/media/Auth/google.png" alt="Google" />
                            </div>
                            <div>
                                <h4>Sign in with Google</h4>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;