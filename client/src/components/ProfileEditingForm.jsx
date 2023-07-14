import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {flipVisibility, modifyProfileField} from "../redux/userProfile/reducer.js";
import { Dialog } from '@headlessui/react'
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useGetUserProfileQuery} from "../redux/api/apiSlice.js";

const ProfileEditingForm = ({userId}) => {
    const dispatch = useDispatch();
    const { firstName, lastName, email, avatar, interested_topics, isOpen } = useGetUserProfileQuery(userId);
    const [selectedAvatar, setSelectedAvatar] = useState(avatar);
    const [newTopic, setNewTopic] = useState('');
    const [topicList, setTopicList] = useState(interested_topics);
    const [FName, setFName] = useState(firstName);
    const [LName, setLName] = useState(lastName);
    const [email_address, setEmail] = useState(email);

    // const handleFieldChange = (e) => {
    //     const specification = {
    //         field: e.target.name,
    //         value: e.target.value,
    //     };
    //     dispatch(modifyProfileField(specification));
    // };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedAvatar(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleNewTopicChange = (e) => {
        setNewTopic(e.value);
    }

    const handleSubmission = (e) => {
        let newFields = {

        }
    };

    const handleRemoveTopic = (currentTopic) => {
        setTopicList((prevState) => prevState.filter(topic => topic !== currentTopic));
    }

    const handleTopicAddition = () => {
        setTopicList((prevState) => [
            ...prevState,
            newTopic
        ])
    }

    const handleClose = () => {
        dispatch(flipVisibility());
    }

    return (
        <div >
            <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 ">
                <div className="mb-6 flex flex-col items-center">
                    <label htmlFor="avatar" className="mb-2">
                        <img
                            className="h-40 w-40 rounded-full object-cover"
                            src={avatar}
                            alt="Avatar"
                        />
                    </label>
                    <input
                        id="avatar"
                        type="file"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />
                    <label
                        htmlFor="avatar"
                        className="bg-gray-200 py-2 px-4 rounded-lg text-gray-800 cursor-pointer hover:bg-gray-300"
                    >
                        Change Avatar
                    </label>
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="firstname"
                    >
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="firstname"
                        defaultValue={firstName}
                    />

                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="lastname"
                    >
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="lastname"
                        defaultValue={lastName}
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email_address"
                    >
                        Email Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email_address"
                        defaultValue={email_address}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSubmission}
                    >
                        Update Information
                    </button>
                </div>
                <div className="mt-8 justify-center">
                    <div className="block text-gray-700 text-sm font-bold mb-2">Interested Topics</div>
                    <div className="border border-gray-300 flex flex-wrap rounded-lg p-4 mb-4">
                        {topicList.map((currentTopic) => (
                            <div className="relative bg-yellow-300 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2" key={currentTopic}>
                                {currentTopic}
                                <button
                                    className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 bg-gray-500 rounded-full text-white flex items-center justify-center text-xs"
                                    onClick={() => handleRemoveTopic(currentTopic)}
                                >
                                    <XMarkIcon/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="newTopicInput"
                    >
                        Add a new topic of interest
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name='newTopicInput'
                        value={newTopic}
                        onChange={handleNewTopicChange}
                    />

                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline justify-center"
                        type="button"
                        onClick={handleTopicAddition}
                    >
                        Add Topic
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProfileEditingForm;
