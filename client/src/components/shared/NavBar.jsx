import {useState} from 'react';
import {AdjustmentsVerticalIcon} from "@heroicons/react/20/solid";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";


const NavBar = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate();


    const logout = () => {
        Cookies.remove("authorization");
        navigate("/");
    }


    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };


    return (
        <nav className="fixed w-full top-0 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 shadow-md z-50">
            <div className="mx-auto px-4 sm:px-6 lg:px-2 flex items-center justify-between h-14">
                <Link to={"/bookshelf"} className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 w-8 mr-2 ml-2"/>
                    <span className="text-white text-lg">LexiBoost</span>
                </Link>
                <div className="flex-1 flex justify-center ml-2">
                    {/*<div className="relative w-full mx-4">*/}
                    {/*<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">*/}
                    {/*    <MagnifyingGlassIcon className="h-5 w-5 text-black" aria-hidden="true" />*/}
                    {/*</div>*/}
                    {/*<input*/}
                    {/*    className="block w-full pl-10 pr-3 py-2 rounded-md bg-white bg-opacity-25 placeholder-black focus:outline-none focus:bg-white focus:bg-opacity-50 sm:text-sm"*/}
                    {/*    type="text"*/}
                    {/*    placeholder="Search Cards..."*/}
                    {/*    aria-label="Search"*/}
                    {/*/>*/}
                    {/*</div>*/}
                </div>
                <div className="flex space-x-3">
                    <Link to={"/bookshelf"}
                          className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium hidden md:block">Bookshelf</Link>
                    <Link to={"/marketplace"}
                          className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium hidden md:block">Marketplace</Link>
                    <Link to={"/profile"}
                          className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium hidden md:block">Profile</Link>
                    <button
                        className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium hidden md:block"
                        onClick={logout}>Logout
                    </button>
                    <button
                        className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium md:hidden"
                        onClick={toggleOverlay}>
                        <AdjustmentsVerticalIcon className="h-5 w-5 text-black" aria-hidden="true"/>
                    </button>
                </div>
            </div>
            {showOverlay && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-md p-4">
                        <Link to={"/bookshelf"}
                              className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium mb-2">Bookshelf</Link>
                        <Link to={"/marketplace"}
                              className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium mb-2">Marketplace</Link>
                        <Link to={"/profile"}
                              className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium mb-2">Profile</Link>
                        <button
                            className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium mb-2"
                            onClick={logout}>Logout
                        </button>
                        <button
                            className="text-black hover:text-gray-50 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                            onClick={toggleOverlay}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
