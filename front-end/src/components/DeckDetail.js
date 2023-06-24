import { useSelector } from "react-redux";
import Tag from "./Tag";

const DeckDetail = () => {
    const {
        name,
        cover,
        tags,
        rating,
        description,
        size,
        creator_name,
        import_count,
        creation_date,
        last_modification_date,
    } = useSelector((state) => state.deckDetail);

    return (
        <div className="bg-gray-50 rounded-lg shadow-lg p-4 flex flex-col md:flex-row">
            <div className="md:w-2/3">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-4">{name}</h2>

                    <h4 className="text-lg font-bold">Description:</h4>
                    <p className="mb-4">{description}</p>

                    <h4 className="text-lg font-bold">Size:</h4>
                    <p className="mb-4">
                        The deck contains{" "}
                        <span className="text-blue-500">{size}</span> cards for you to
                        study
                    </p>

                    <div>
                        <h4 className="text-lg font-bold">Tags:</h4>
                        <ul className="mb-4">
                            {tags.map((currentTag) => (
                                <Tag key={currentTag.id} tagName={currentTag.name} />
                            ))}
                        </ul>
                    </div>

                    <h4 className="text-lg font-bold">Rating:</h4>
                    <span className="mb-4">{rating} / 5</span>

                    <h4 className="text-lg font-bold">About:</h4>
                    <span> - </span>
                    <span className="text-green-500"> {import_count}</span> <span> users have imported this deck</span>
                    <p className="mb-4">
                        - The deck is provided by{" "}
                        <span className="text-red-500">{creator_name}</span> on{" "}
                        <span className="text-purple-500">{creation_date}</span> and was
                        last modified on{" "}
                        <span className="text-purple-500">{last_modification_date}</span>
                    </p>
                    <button className="relative rounded-lg inline-block px-6 py-1 text-lg font-bold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-800 hover:to-blue-800 hover:scale-105 focus:outline-none">
                        <span>Import</span>
                        <div className="absolute top-0 right-0 w-0 h-full transition-all duration-300 ease-in-out bg-blue-600 opacity-75"></div>
                    </button>
                </div>
            </div>

            <div className="md:w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <img src={cover} alt="Deck Cover" className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default DeckDetail;
