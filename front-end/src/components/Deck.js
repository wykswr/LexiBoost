import Tag from "./Tag";

function Deck({ deck }) {
    return (
        <li className="p-4 bg-cyan shadow-xl rounded-lg">
            <div>
                <h3 className="text-2xl font-bold mb-4">{deck.title}</h3>
                <img
                    src={deck.cover}
                    alt="Picture not available"
                    className="mb-4 rounded-lg shadow-md"
                />
                <div className="text-sm mb-2">Size: {deck.total}</div>
                <div className="mb-4">
                    Tags:{" "}
                    {deck.tags.map((currentTag) => (
                        <Tag
                            key={currentTag.tagID}
                            tag={currentTag}
                            className="mr-2 mb-2 inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full shadow-sm"
                        />
                    ))}
                </div>
                <div className="mb-2">
                    Rating:{" "}
                    <span className="text-yellow-400">{deck.rating}</span>
                </div>
                <div>
                    This deck has been imported by{" "}
                    <span className="font-semibold">{deck.import_count}</span>{" "}
                    {deck.import_count === 1 ? "user" : "users"}
                </div>
            </div>
        </li>
    );
}

export default Deck;
