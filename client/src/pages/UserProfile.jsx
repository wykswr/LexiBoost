import { FireIcon, Square3Stack3DIcon, UserCircleIcon, RectangleStackIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {flipVisibility} from "../redux/userProfile/reducer.js";
import ProfileEditingForm from "../components/ProfileEditingForm.jsx";
import {useGetUserProfileQuery} from "../redux/api/apiSlice.js";


const UserProfile = ({ ID }) => {
    const dispatch = useDispatch();
    const { username, avatar, email_address, interested_topics, decks_created} = useGetUserProfileQuery;
    function handleEditFormVisibility() {
        dispatch(flipVisibility());
    }

    return (
        <div className="bg-gray-100 p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8">
                <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 md:col-span-1">
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-2 hover:cursor-pointer hover:shadow-lg rounded-lg">
                            <UserCircleIcon className="h-5 w-5 text-yellow-400" />
                            <span className="text-gray-800" onClick={handleEditFormVisibility}>Edit Profile</span>
                        </li>
                        <li className="flex items-center space-x-2 hover:cursor-pointer hover:shadow-lg rounded-lg">
                            <Square3Stack3DIcon className="h-5 w-5 text-yellow-400" />
                            <span className="text-gray-800">Bookshelf</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 md:col-span-4">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
                        <div className="w-full md:w-1/3 flex items-center justify-center">
                            <img className="h-40 w-40 bg-gray-300 rounded-full" src={avatar} alt="User Avatar" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg font-medium text-gray-800">User: {username}</div>
                            <div className="text-gray-700">Email Address: {email_address}</div>
                            <div className="mt-8">
                                <div className="text-gray-700">Interested Topics:</div>
                                <div className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-wrap">
                                    {interested_topics.map((currentTopic) => (
                                        <div className="relative bg-yellow-300 hover:bg-yellow-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2" key={currentTopic}>
                                            {currentTopic}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between mt-8">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <FireIcon className="h-5 w-5 text-red-500" />
                            <span className="text-gray-800">You have studied 114,514 cards</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RectangleStackIcon className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-800">You have studied 1,919,810 decks</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 items-center flex flex-col">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 justify-center"> Decks I created </h1>
                <div className="shadow-lg rounded-lg bg-white">
                    <div className="flex flex-col md:flex-row gap-4 p-4">
                        {decks_created.map((deck, index) => (
                            <div
                                key={index}
                                className="p-4 bg-yellow-300 hover:bg-yellow-400 rounded-lg shadow-md hover:cursor-pointer"
                            >
                                {deck.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProfileEditingForm close={handleEditFormVisibility} />
        </div>
    );
};

export default UserProfile;
