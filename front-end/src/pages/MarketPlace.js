// import {useSelector} from "react-redux";
import SearchCard from "../components/SearchCard";
import Deck from "../components/shared/Deck";

const MarketPlace = () => {
    // const deckIds = useSelector(state => state.marketPlace.results);
    const deckIds = [];
    return (
        <div className={"container mx-auto mt-8 flex flex-col gap-6 justify-center"}>
            <SearchCard/>
            <div className={"flex flex-col gap-6 md:flex-row md:flex-wrap"}>
                {deckIds.map(deckId => <Deck key={deckId} id={deckId} inMarket={true}/>)}
            </div>
        </div>
    );
}

export default MarketPlace;