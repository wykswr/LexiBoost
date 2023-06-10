import React, { useState } from 'react';
import "./DeckEditor.css"

function DeckEditor({onClose}) {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [tag, setTags] = useState('');
    const handleSave = () => {
        // Logic to save the changes
    };

    const handleCancel = () => {
        // Logic to cancel the changes or close the popup
        onClose();
    };

    const addTag = () => {

    };

    return (
        <div className="edit-popup-overlay">
            <div className="edit-popup">
                <label>
                    Title:
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                </label>
            <label>
                Image URL:
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </label>

            <label>
                Tags:
                <div>
                <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTags(e.target.value.split(','))}
                />
                <button onClick={addTag}>add tag</button>
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
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}


export default DeckEditor;