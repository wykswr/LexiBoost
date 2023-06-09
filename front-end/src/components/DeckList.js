import {useSelector} from "react-redux";
import Deck from "./Deck";

function DeckList() {
    //const dispatch = useDispatch();
    const marketDeckList = useSelector(state => state.MarketDeckList);

    return (<div>
        <ul>
            {marketDeckList.Items.map((marketDeck) => (<Deck key={marketDeck.id} deck={marketDeck}></Deck>))}
        </ul>
    </div>)
}

export default DeckList;