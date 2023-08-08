import {useEffect, useRef} from 'react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {toggleAuthMode} from "../redux/auth/reducer.js";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {useSignupMutation} from "../redux/api/apiSlice.js";


const Signup = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [signup, {isError, isSuccess}] = useSignupMutation();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (isError) {
            toast.error('Failed to signup. Please try again later.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error',
            });
        }
    }, [isError])


    const handleSubmit = (e) => {
        e.preventDefault();

        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match. Try again!', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-error',
            });
            return;
        }

        const content = {
            firstName: firstNameRef.current.value.trim(),
            lastName: lastNameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            password
        }

        signup(content);
    };

    function handleSignup() {
        dispatch(toggleAuthMode());
    }

    if (isSuccess) return (
        window.location.reload()
    )


    return (
        <div className="flex justify-center items-center h-screen">
            <ToastContainer/>
            <form className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96"
                  onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Sign Up</h2>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                            name</label>
                        <input type="text" id="first_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="John" required ref={firstNameRef}/>
                    </div>
                    <div>
                        <label htmlFor="last_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                            name</label>
                        <input type="text" id="last_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Doe" required ref={lastNameRef}/>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
                        address</label>
                    <input type="email" id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="john.doe@company.com" required ref={emailRef}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="•••••••••" required
                           ref={passwordRef}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                        password</label>
                    <input type="password" id="confirm_password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="•••••••••" required
                           ref={confirmPasswordRef}
                    />
                </div>
                <button type="submit"
                        className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
                <p className="text-lg mt-6 text-black-500">Already have an account? <Button onClick={handleSignup}
                                                                                            className="text-black font-bold rounded">
                    Log in</Button></p>
            </form>
        </div>
    );
};

export default Signup;