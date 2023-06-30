import Deck from "./Deck";
import BookshelfDropdown from "./BookshelfDropdown";

const Book = ({id}) => {
    return (
        <div className={"relative w-full h-80 md:w-96 md:h-64 "}>
            <Deck id={id}/>
            <BookshelfDropdown id={id} className={"absolute top-0 right-0 z-10"}/>
        </div>
    )
}

export default Book;
