import React, {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialMediaIcons from './SocialMediaIcons.jsx';
import {useLoginMutation} from "../redux/api/apiSlice.js";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, {data, isError, isSuccess}] = useLoginMutation();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            toast.error('Username and password are required.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error',
            });
            return;
        }

        login({email: username.trim(), password: password.trim()});
    };
    useEffect(()=>{
        if (isError) {
            toast.error('Failed to login. Please check your credentials.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error',
            });
        }
    }, [isError])


    if (isSuccess) {
        Cookies.set('authorization', data.token, {expires: 1});
        return (
            <div className="fixed left-0 right-0 top-0 bottom-0 grid place-items-center z-50">
                <div className={"w-96 grid place-items-center gap-6"}>
                    <h2 className="text-3xl font-semibold text-green-500 text-center mt-64">Successfully Login!</h2>
                    <Link to={"/bookshelf"}
                          className={"bg-indigo-500 w-1/4 text-white text-lg rounded-lg px-1.5 py-0.5 hover:bg-indigo-600 mx-auto text-center"}>Have
                        fun
                    </Link>
                </div>
            </div>)
    }

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
                <div className="text-center py-6">
                    {/*<p className="text-3xl font-semibold text-black-800">Continue to Your Account</p>*/}
                    {/*<p className="text-lg mt-2 mb-4 text-black-500">Click to Sign Up</p>*/}
                    <SocialMediaIcons/>
                    <div className="mt-6">
                        <div className="flex items-center justify-center">
                            <hr className="border-t border-gray-300 w-1/4"/>
                            <p className="mx-3 text-black-500">or</p>
                            <hr className="border-t border-gray-300 w-1/4"/>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
                <form className="flex flex-col space-y-4">
                    <TextField
                        label="Email"
                        variant="filled"
                        type="email"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mb-4"
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 hover:bg-blue-800 text-white font-bold py-2 rounded"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
