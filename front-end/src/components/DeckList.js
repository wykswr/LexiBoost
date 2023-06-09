import { useSelector } from "react-redux";
import Deck from "./Deck";

function DeckList() {
    const marketDeckList = useSelector((state) => state.MarketDeckList);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {marketDeckList.Items.map((marketDeck) => (
                <Deck key={marketDeck.id} deck={marketDeck} />
            ))}
        </div>
    );
}

export default DeckList;
