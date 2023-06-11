import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialMediaIcons from './SocialMediaIcons';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            toast.error('Username and password are required.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error',
            });
            return;
        }

        // Show a success message after successful login
        toast.success('Login successful!', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-success',
        });
    };

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
                <div className="text-center py-6">
                    <p className="text-3xl font-semibold text-black-800">Continue to Your Account</p>
                    <p className="text-lg mt-2 mb-4 text-black-500">Login with your social media</p>
                    <SocialMediaIcons />
                    <div className="mt-6">
                        <div className="flex items-center justify-center">
                            <hr className="border-t border-gray-300 w-1/4" />
                            <p className="mx-3 text-black-500">or</p>
                            <hr className="border-t border-gray-300 w-1/4" />
                        </div>
                    </div>
                </div>
                <ToastContainer />
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
                        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 rounded"
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
