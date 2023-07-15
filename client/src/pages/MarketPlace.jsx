// import {useSelector} from "react-redux";
import SearchCard from "../components/shared/SearchCard.jsx";

const MarketPlace = () => {
    return (
        <div className={"container mx-auto pt-16 flex flex-col gap-6 justify-center"}>
            <SearchCard/>
            <div className={"flex flex-col gap-6 md:flex-row md:flex-wrap"}>
            </div>
        </div>
    );
}

export default MarketPlace;