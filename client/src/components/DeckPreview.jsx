import { XMarkIcon } from "@heroicons/react/24/outline/index.js";
import VisibilityToggle from "./shared/VisibilityToggle.jsx";
import {
    useGetDeckQuery,
    useHardDeleteDeckMutation,
    usePublishDeckMutation,
    useRetractDeckMutation
} from "../redux/api/apiSlice.js";

const DeckPreview = ({deck}) => {
    const {data, isLoading, isError} = useGetDeckQuery(deck._id);
    const [publishDeck] = usePublishDeckMutation();
    const [retractDeck] = useRetractDeckMutation();
    const [deleteDeck] = useHardDeleteDeckMutation();
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    const setEnabled = async () => {
        if (data.deck.isPublic) {
            await retractDeck(data.deck._id);
        } else {
            await publishDeck(data.deck._id);
        }
    }
    const handleDeckDeletion= async () => {
        await deleteDeck(data.deck._id);
    }

    return (
        <div
            className="relative p-4 bg-yellow-300 hover:bg-yellow-400 rounded-lg shadow-md hover:cursor-pointer"
        >
            {data.deck.name}
            <button
                className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 bg-gray-500 rounded-full text-white flex items-center justify-center text-xs"
                onClick={() => handleDeckDeletion(data.deck._id)}
            >
                <XMarkIcon/>
            </button>
            <VisibilityToggle setEnabled={setEnabled} enabled={data.deck.isPublic}/>
        </div>
    );
}

export default DeckPreview;