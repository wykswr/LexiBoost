import {useDispatch, useSelector} from "react-redux";
import { Tab } from '@headlessui/react'
import {FireIcon, RectangleStackIcon, Square3Stack3DIcon, UserCircleIcon} from "@heroicons/react/20/solid";
import {flipVisibility} from "../redux/userProfile/reducer.js";
import {Cog8ToothIcon} from "@heroicons/react/24/solid";
import ProfileEditingForm from "../components/ProfileEditingForm.jsx";
const UserProfileUpdated = ({ID}) => {
    const dispatch = useDispatch();
    const { firstName, lastName, avatar, email_address, interested_topics, decks_created} = useSelector((state) => state.profileEditingForm);
    function handleRemoveTopic(currentTopic) {
        // Handle remove topic logic
    }
    // <h1 className="text-3xl font-bold text-gray-800 mb-4 justify-center"> Decks I created </h1>
    function handleEditFormVisibility() {
        dispatch(flipVisibility());
    }
    return (
        <div>
            <Tab.Group vertical>
                <Tab.List className="flex md:flex-row justify-center" defaultIndex={2}>
                    <Tab className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-t-lg"> <Cog8ToothIcon className="h-5 w-5 text-white"/> </Tab>
                    <Tab className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-t-lg"> User </Tab>
                    <Tab className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-t-lg"> Decks I created </Tab>

                </Tab.List >
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="flex flex-col items-center bg-gray-500 p-8">
                            <ProfileEditingForm/>
                        </div>

                    </Tab.Panel>
                    <Tab.Panel className="flex flex-col items-center bg-blue-400 p-8">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
                            <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 md:col-span-4">
                                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
                                    <div className="w-full md:w-1/3 flex items-center justify-center">
                                        <img className="h-40 w-40 bg-gray-300 rounded-full" src={avatar} alt="User Avatar" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="text-lg font-medium text-gray-800"> Welcome back, {firstName}</div>
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
                    </Tab.Panel>
                    <Tab.Panel className="bg-blue-300 p-8">
                        <div className="mt-8 items-center flex flex-col">

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
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
        )

}

export default UserProfileUpdated;