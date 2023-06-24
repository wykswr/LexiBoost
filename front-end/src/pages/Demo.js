import SearchCard from "../components/SearchCard";
import Deck from "../components/Deck";

const Demo = () => {
    return (
        <div className={"container mx-auto flex flex-col gap-6 justify-center"}>
            <SearchCard/>

            <Deck id={1} inMarket={true}/>
        </div>

    );
}

export default Demo;