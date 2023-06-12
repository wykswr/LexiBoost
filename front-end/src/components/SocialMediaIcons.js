import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import {useDispatch} from "react-redux";
import {toggleAuthMode} from "../redux/auth/reducer";

const SocialMediaIcons = () => {
    const dispatch = useDispatch();
    const handleGoogleSignIn = () => {
        // Implement your logic for handling Google sign-in here
        console.log('Google sign-in clicked');
    };

    const handleFacebookSignIn = () => {
        // Implement your logic for handling Facebook sign-in here
        console.log('Facebook sign-in clicked');
    };

    const handleSignUp = () => {
        // Implement your logic for handling LinkedIn sign-in here
        dispatch(toggleAuthMode());
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <div
                className="flex items-center cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-150"
                onClick={handleFacebookSignIn}
            >
                <FacebookIcon></FacebookIcon>
            </div>
            <div
                className="flex items-center cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-150"
                onClick={handleGoogleSignIn}
            >
                <GoogleIcon></GoogleIcon>
            </div>
            <div
                className="flex items-center cursor-pointer hover:text-blue-500 h-12 w-12 transition-transform transform hover:scale-150"
                onClick={handleSignUp}
            >
                <img src={require('../assets/signup.webp')} alt={"Sign Up"}/>
            </div>
        </div>

    )
}

export default SocialMediaIcons