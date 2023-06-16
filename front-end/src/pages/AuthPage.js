import Login from "../components/Login";
import React from "react";
import Signup from "../components/Signup";
import {useSelector} from "react-redux";

const AuthPage = () => {
    const isSignIn = useSelector((state) => state.auth.isSignIn);

    return (
        <div className="bg-gradient-to-r from-gray-200">
            <div className="absolute top-0 left-0 p-4 p-4 hidden xl:block">
                <img src={require("../assets/logo.png")} alt="Logo"/>
            </div>
            <div
                style={{
                    transform: `rotateY(${isSignIn ? '0' : '360deg'})`,
                    transition: 'transform 1s ease',
                }}
                variant="outlined"
            >
                <div>
                    {isSignIn ? (
                        <Login />
                    ) : (
                        <Signup />
                    )}
                </div>
            </div>
        </div>
    )
}
export default AuthPage