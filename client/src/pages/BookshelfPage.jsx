import CreateDeck from "../components/CreateDeck.jsx";
import {useGetDecksQuery} from "../redux/api/apiSlice.js";
import Deck from "../components/Deck.jsx";
import MyDialog from "../components/shared/MyDialog.jsx";

function BookshelfPage() {
    const {data, isLoading, isError} = useGetDecksQuery();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <div className={"bg-topography bg-blue-50 bg-opacity-70 h-screen"}>
            <div className={"container pt-16 mx-auto flex flex-col gap-6 md:flex-row md:flex-wrap mx"}>
                {data.decks.map(deck => <Deck key={deck._id} item={deck}/>)}
                <CreateDeck/>
                <MyDialog/>
            </div>
        </div>
    )
}

export default BookshelfPage;