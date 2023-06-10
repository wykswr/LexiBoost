import Tag from "./Tag";
import {Rating} from "@mui/material";

function MarketDeck({ deck }) {
    return (
        <li className="w-full md:w-80 transition cursor-pointer md:flex shadow-xl hover:shadow-2xl bg-cyan rounded-lg md:content-stretch overflow-hidden" >
            <div>
                <div>
                    <img
                        src={deck.cover}
                        alt="Picture not available"
                        className="object-cover mb-4 w-full h-60 md:w-80"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-2xl font-bold mb-4">{deck.title}</h3>
                    <div className="mb-2 "> Deck Size:{" "}
                        <span className="text-green-500">
                     {deck.total}
                    </span>
                    </div>

                    <div className="mb-2 flex content-center">
                        <div>Rating: </div>
                        <Rating className=" rounded-lg" name="read-only" precision={0.1} value={deck.rating} readOnly />
                    </div>
                    <div className="mb-4 flex gap-1 md:h-20">
                        <div> Tags: </div>
                        <div className=" rounded-md p-1 content-center flex-wrap">
                            {deck.tags.map((currentTag) => (
                                <Tag
                                    key={currentTag.tagID}
                                    tag={currentTag}
                                />
                            ))}
                        </div>

                    </div>
                    <div>
                        This deck has been imported by{" "}
                        <span className="font-semibold">{deck.import_count}</span>{" "}
                        {deck.import_count === 1 ? "user" : "users"}
                    </div>
                </div>
                <div className="w-15 h-15 p-4">
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 bg-green-500 rounded-full transition hover:bg-green-300 hover:scale-125">
                        <path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
                    </svg>
                </div>
            </div>
        </li>
    );
}

export default MarketDeck;
