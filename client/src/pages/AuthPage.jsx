import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import {useSelector} from "react-redux";
import logo from "../assets/logo.png";

const AuthPage = () => {
    const isSignIn = useSelector((state) => state.auth.isSignIn);

    return (
        <div className="bg-gradient-to-r from-gray-200 pt-16">
            <div className="absolute top-0 left-0 p-4 hidden xl:block">
                <img src={logo} alt="Logo"/>
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