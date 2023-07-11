import Book from "../components/Book.jsx";
import CreateDeck from "../components/CreateDeck.jsx";
import {useGetDecksQuery} from "../redux/api/apiSlice.js";

function BookshelfPage() {
    const {data, isLoading, isError} = useGetDecksQuery();

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <div className={"bg-topography bg-blue-50 bg-opacity-70 h-screen"}>
            <div className={"container py-6 mx-auto flex flex-col gap-6 md:flex-row md:flex-wrap mx"}>
            {data.decks.map(deck => <Book key={deck._id} id={deck._id}/>)}
            <CreateDeck/>
            </div>
        </div>
    )
}

export default BookshelfPage;