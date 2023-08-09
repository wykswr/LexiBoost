import {
    useGetAllDecksQuery,
} from "../redux/api/apiSlice.js";
import DeckPreview from "./DeckPreview.jsx";

const DeckPreviewList = () => {
    const {data, isLoading, isError} = useGetAllDecksQuery();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <div className="mt-8 items-center flex flex-col">
            <div className="p-4">
                <span className="text-white font-bold text-lg">
                        Use this quick access tool to change the visibility of your decks or delete them
                 </span>
            </div>

            <div className="md:w-1/2 h-auto shadow-lg rounded-lg bg-white">
                <div className="flex flex-col md:flex-row gap-4 p-4 overflow-y-auto md:overflow-x-auto">
                    {data.decks.map(deck => (
                        <DeckPreview key={deck._id} deck={deck}/>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default DeckPreviewList;