import Tag from "./shared/Tag.jsx";
import {useGetDeckQuery, useImportDeckMutation} from "../redux/api/apiSlice.js";

const DeckDetail = ({id}) => {

    const {data, isLoading, isError} = useGetDeckQuery(id);
    const [importDeck, { isInProgress }] = useImportDeckMutation();
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>


    const handleImport = async () => {
        await importDeck(id);
    }

    return (
        <div className="bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col md:flex-row">
            <div className="md:w-2/3">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-4">{data.deck.name}</h2>

                    <h4 className="text-lg font-bold">Description:</h4>
                    <p className="mb-4">{data.deck.description}</p>

                    <h4 className="text-lg font-bold">Size:</h4>
                    <p className="mb-4">
                        The deck contains{" "}
                        <span className="text-blue-500">{data.deck.size}</span> cards for you to
                        study
                    </p>

                    <div>
                        <h4 className="text-lg font-bold">Tags:</h4>
                        <ul className="mb-4">
                            {data.deck.tags.map((currentTag) => (
                                <Tag key={currentTag} tagName={currentTag} />
                            ))}
                        </ul>
                    </div>

                    <h4 className="text-lg font-bold">Rating:</h4>
                    <span className="mb-4">{data.deck.rating} / 5</span>

                    <h4 className="text-lg font-bold">About:</h4>
                    <span> - </span>
                    <span className="text-green-500"> {data.deck.importCount}</span> <span> users have imported this deck</span>
                    <p className="mb-4">
                        - The deck is provided on{" "}
                        <span className="text-purple-500">{data.deck.creationDate}</span> and was
                        last modified on{" "}
                        <span className="text-purple-500">{data.deck.lastModificationDate}</span>
                    </p>
                    <button onClick={handleImport} className="relative rounded-lg inline-block px-6 py-1 text-lg font-bold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-800 hover:to-blue-800 hover:scale-105 focus:outline-none">
                        <span>Import</span>
                    </button>
                </div>
            </div>

            <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <img src={data.deck.cover} alt="Deck Cover" className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default DeckDetail;
