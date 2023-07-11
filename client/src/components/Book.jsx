import Deck from "./shared/Deck.jsx";
import DownMenu from "./DownMenu.jsx";
import PropTypes from "prop-types";

const Book = ({id}) => {
    return (
        <div className={"relative w-full h-80 md:w-96 md:h-64 "}>
            <Deck id={id}/>
            <DownMenu id={id} className={"absolute top-0 right-0 z-10"}/>
        </div>
    )
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Book;
