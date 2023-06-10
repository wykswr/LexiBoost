import { useSelector } from "react-redux";
import MarketDeck from "./MarketDeck";

function DeckList() {
    const marketDeckList = useSelector((state) => state.MarketDeckList);

    return (
        <div className="flex flex-wrap gap-4 m-4">
            {marketDeckList.items.map((marketDeck) => (
                <MarketDeck key={marketDeck.id} deck={marketDeck} />
            ))}
        </div>
    );
}

export default DeckList;
