import React, { useState } from 'react';

function DeckEditor({onClose,  isPopupOpen}) {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [tag, setTags] = useState('');
    const handleSave = () => {
        // Logic to save the changes

        onClose();
    };

    const handleCancel = () => {
        // Logic to cancel the changes or close the popup

        onClose();
    };

    const addTag = () => {

    };

    return (
        <div className="relative">
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            )}

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md z-50 max-w-md w-full">
                <label>
                    Title:
                    <input
                        className="border border-gray-300 rounded px-4 py-2 mt-1 w-full"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                </label>
            <label>
                Image URL:
                <input className="border border-gray-300 rounded px-4 py-2 mt-1 w-full"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </label>

            <label>
                Tags:
                <div>
                <input className="border border-gray-300 rounded px-4 py-2 mt-1 w-full"
                    type="text"
                    value={tag}
                    onChange={(e) => setTags(e.target.value.split(','))}
                />
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addTag}>add tag</button>
                </div>
            </label>

            <div className="flex items-center flex-wrap mt-5 gap-2">
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-1 hover:bg-pink-400">
                    tag1 <button>X</button>
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-1 hover:bg-pink-400">
                    tag2 <button>X</button>
                </div>
            </div>
                <div className="flex items-center flex-wrap mt-5 gap-2">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSave}>Save</button>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>

    );
}


export default DeckEditor;