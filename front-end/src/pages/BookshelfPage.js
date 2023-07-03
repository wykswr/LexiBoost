import {useEffect} from "react";
import Book from "../components/Book";
import {getBooks} from "../redux/bookshelf/thunk";
import {useDispatch, useSelector} from "react-redux";
import CreateDeck from "../components/CreateDeck";

function BookshelfPage() {
    const decks = useSelector(state => state.bookshelf.IDs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);
    return (
        <div className={"bg-topography bg-blue-50 bg-opacity-70 h-screen"}>
            <div className={"container py-6 mx-auto flex flex-col gap-6 md:flex-row md:flex-wrap mx"}>
            {decks.map(deck => <Book key={deck} id={deck}/>)}
            <CreateDeck/>
            </div>
        </div>
    )
}

export default BookshelfPage;