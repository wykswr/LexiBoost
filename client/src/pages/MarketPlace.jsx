import {useDispatch, useSelector} from "react-redux";
import SearchCard from "../components/SearchCard.jsx";
import {useSearchDecksQuery} from "../redux/api/apiSlice.js";
import Good from "../components/Good.jsx";
import {Pagination} from "@mui/material";
import {setPage} from "../redux/search/reducer.js";
import ToLogin from "../components/ToLogin.jsx";
import NavBar from "../components/shared/NavBar.jsx";


const MarketPlace = () => {
    const {name, tags, sort, page} = useSelector(state => state.search);
    const {data, isLoading, isError} = useSearchDecksQuery({name, tags, page, sort});
    const dispatch = useDispatch();

    const handleChange = (event, value) => {
        dispatch(setPage(value - 1));
    }
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <ToLogin/>;

    return (
        <>
            <NavBar/>
            <div className={"container mx-auto pt-16 flex flex-col gap-6 justify-center"}>
                <SearchCard/>
                <div className={"flex flex-col gap-6 md:flex-row md:flex-wrap justify-center"}>
                    {data.decks.map(deck => <Good key={deck._id} item={deck}/>)}
                </div>
                <div className={"fixed bottom-0 left-0 w-full grid place-items-center py-2 z-10"}>
                    <Pagination count={data.totalPages} variant="outlined" color="secondary" onChange={handleChange}/>
                </div>
            </div>
        </>
    );
}

export default MarketPlace;