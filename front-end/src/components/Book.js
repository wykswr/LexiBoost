import Deck from "./shared/Deck";
import DownMenu from "./DownMenu";

const Book = ({id}) => {
    return (
        <div className={"relative w-full h-80 md:w-96 md:h-64 "}>
            <Deck id={id}/>
            <DownMenu id={id} className={"absolute top-0 right-0 z-10"}/>
        </div>
    )
}

export default Book;
