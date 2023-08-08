import { Tab } from '@headlessui/react'
import {Cog8ToothIcon} from "@heroicons/react/24/solid";
import ProfileEditingForm from "../components/ProfileEditingForm";
import {
    useGetUserProfileQuery,
} from "../redux/api/apiSlice.js";

import DeckPreviewList from "../components/DeckPreviewList.jsx";
import ToLogin from "../components/ToLogin.jsx";
import NavBar from "../components/shared/NavBar.jsx";
import {Base64, decode} from 'js-base64';

const UserProfileUpdated = ({id}) => {
    const {data, isLoading, isError} = useGetUserProfileQuery();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <ToLogin/>;


    return (
        <>
            <NavBar/>
            <div className={"h-screen container pt-16 mx-auto flex flex-col mx"}>
            <Tab.Group vertical defaultIndex={1}>
                <Tab.List className="flex md:flex-row justify-center" >
                    <Tab className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-t-lg"> <Cog8ToothIcon className="h-5 w-5 text-white"/> </Tab>
                    <Tab className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-t-lg"> User </Tab>
                    <Tab className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-t-lg"> My Decks </Tab>
                </Tab.List >
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="flex flex-col items-center bg-gray-500 p-8">
                            <ProfileEditingForm userId={id}/>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="flex flex-col items-center bg-blue-400 p-8">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
                            <div className="bg-white shadow-lg rounded-lg p-4 md:p-8 md:col-span-4">
                                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center">
                                    <div className="w-full md:w-1/3 flex items-center justify-center">
                                        <img className="h-40 w-40 bg-gray-300 rounded-full" src={decode(data.avatar)} alt="User Avatar" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="text-lg font-medium text-gray-800">User: {data.firstName}</div>
                                        <div className="text-gray-700">Email Address: {data.email}</div>
                                        <div className="mt-8">
                                            <div className="text-gray-700">Interested Topics:</div>
                                            <div className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-wrap">
                                                {data.interestedTopics.map((currentTopic) => (
                                                    <div className="relative bg-yellow-300 hover:bg-yellow-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2" key={currentTopic}>
                                                        {currentTopic}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="bg-blue-300 p-8">
                        <DeckPreviewList />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
        </>
    )

}

export default UserProfileUpdated;