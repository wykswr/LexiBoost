import React, { useState } from 'react';

function DeckEditor({id}) {

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [tag, setTags] = useState('');
    // const handleSave = () => {
    //     // Logic to save the changes
    //
    //     onClose();
    // };
    //
    // const handleCancel = () => {
    //     // Logic to cancel the changes or close the popup
    //
    //     onClose();
    // };
    //
    // const addTag = () => {
    //
    // };

    return (
        <div className="relative">
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            )}

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md z-50 max-w-md w-full">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />


                <label>
                    Tags:
                    <div className="flex items-center flex-wrap mt-5 gap-2">
                    {deck.tags.map((tag) => (
                        <div
                            key={tag}
                            className="bg-gray-200 rounded-xl px-2 py-0.5 text-sm font-semibold text-gray-700 hover:bg-blue-700"
                        >
                            {tag} <button>X</button>
                        </div>
                    ))}
                        <button className="bg-gray-200 rounded-xl px-2 py-0.5 text-sm font-semibold text-gray-700 hover:bg-blue-700">+</button>
                </div>
                </label>

                <label>
                Description:
                <textarea placeholder={deck.description} className="border border-gray-300 rounded px-4 py-2 mt-1 w-full"
                       type="text"
                       value={description}
                       onChange={(e) => setDescription(e.target.value)}
                />
            </label>


                <div className="flex items-center flex-wrap mt-5 gap-2">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSave}>Save</button>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>

    );
}


export default DeckEditor;