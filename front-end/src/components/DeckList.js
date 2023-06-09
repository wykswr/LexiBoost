import { useSelector } from "react-redux";
import Deck from "./Deck";

function DeckList() {
    const marketDeckList = useSelector((state) => state.MarketDeckList);

    return (
        <div className="flex flex-cols gap-4 sm:flex-cols-1 md:flex-cols-2 m-4">
            {marketDeckList.items.map((marketDeck) => (
                <Deck key={marketDeck.id} deck={marketDeck} />
            ))}
        </div>
    );
}

export default DeckList;
