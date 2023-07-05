import { useDispatch, useSelector } from "react-redux";
import { modifyInputField } from "../redux/card_creation/reducer";

const CardAddition = ({deckId, cardId}) => {
    const dispatch = useDispatch();
    const { spelling, type, pronunciation, hint, definition } = useSelector(
        (state) => state.creationForm
    );

    const handleFieldChange = (e) => {
        const specification = {
            field: e.target.name,
            value: e.target.value,
        };
        dispatch(modifyInputField(specification));
    };

    return (
        <div className="p-4 md:p-8 bg-gray-100 rounded-lg shadow-lg">
            <div className="md:flex md:items-stretch">
                <div className="md:w-1/2 md:border md:rounded-lg md:shadow-md bg-white">
                    <div className="p-4 flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-4">Front side</h2>
                        <label
                            htmlFor="spelling"
                            className="block mb-2 text-gray-700 font-bold"
                        >
                            Word
                        </label>
                        <input
                            name="spelling"
                            type="text"
                            value={spelling}
                            onChange={handleFieldChange}
                            className="border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                        />

                        <label
                            htmlFor="type"
                            className="block mb-2 text-gray-700 font-bold"
                        >
                            Type of the word (Optional)
                        </label>
                        <input
                            name="type"
                            type="text"
                            value={type}
                            onChange={handleFieldChange}
                            className="border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                        />

                        <label
                            htmlFor="pronunciation"
                            className="block mb-2 text-gray-700 font-bold"
                        >
                            Pronunciation (Optional)
                        </label>
                        <input
                            name="pronunciation"
                            type="text"
                            value={pronunciation}
                            onChange={handleFieldChange}
                            className="border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                        />

                        <div className="flex-grow"></div>
                    </div>
                </div>

                <div className="md:w-1/2 md:border md:rounded-lg md:shadow-md bg-white">
                    <div className="p-4 flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-4">Back side</h2>

                        <label htmlFor="hint" className="block mb-2 text-gray-700 font-bold">
                            Add a hint for the word (Optional)
                        </label>
                        <textarea
                            name="hint"
                            value={hint}
                            onChange={handleFieldChange}
                            className="border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                        />

                        <label htmlFor="definition" className="block mb-2 text-gray-700 font-bold">
                            Definition
                        </label>
                        <textarea
                            name="definition"
                            value={definition}
                            onChange={handleFieldChange}
                            className="border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
                        />

                        <div className="flex-grow"></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none">
                    Cancel
                </button>
                <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none">
                    Create
                </button>
            </div>
        </div>
    );
};

export default CardAddition;
