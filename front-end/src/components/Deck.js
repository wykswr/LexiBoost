import Tag from "./Tag";

function Deck({deck}) {
    return (<li>
        <div>
            <h3> {deck.title} </h3>
            <img src={deck.cover} alt="Picture not available"></img>
            <div> Size: {deck.total} </div>
            <div> Tags: {deck.tags.map((currentTag) => (<Tag key={currentTag.tagID} tag={currentTag}></Tag>))}</div>
            <div> Rating: {deck.rating} </div>
            <div> This deck has been imported by {deck.import_count} users </div>
        </div>
    </li>)
}

export default Deck;