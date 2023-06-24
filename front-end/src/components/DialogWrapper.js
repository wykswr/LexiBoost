import { useState } from 'react';

const DialogWrapper = ({ onClose, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-900 opacity-50 z-10"></div>

            <div className="flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg relative z-20">
                    {children}

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogWrapper;
