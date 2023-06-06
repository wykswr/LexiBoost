import React, {useState} from 'react';
import {TextField, Button} from '@mui/material';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
                <ToastContainer/>
                <h2 className="text-3xl font-bold mb-6">Login</h2>
                <form className="flex flex-col space-y-4">
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mb-4"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
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
                        className="py-2"
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
