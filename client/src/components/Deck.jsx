import PropTypes from "prop-types";
import DownMenu from "./DownMenu.jsx";
import * as Progress from '@radix-ui/react-progress';
import {useGetDeckStatsQuery} from "../redux/api/apiSlice.js";
import {ArrowPathIcon, BookOpenIcon, PlayIcon} from "@heroicons/react/20/solid/index.js";
import {Link} from "react-router-dom";

const Deck = ({item}) => {
    const {data, isLoading} = useGetDeckStatsQuery(item._id)
    if (isLoading) return (
        <div className="w-full h-80 rounded-lg shadow grid items-stretch md:w-96 md:h-64">
            <ArrowPathIcon className={"h-32 w-32 animate-spin text-gray-500 m-auto"}/>
        </div>
    )

    return (
        <div className="w-full h-80 md:w-96 md:h-64 grid grid-cols-2 place-items-stretch rounded-lg overflow-hidden bg-gray-50 shadow relative">
            <div className={"absolute top-0 right-0"}>
                <DownMenu id={item._id}/>
            </div>
            <img src={item.cover} alt={item.name} className={"object-cover"}/>
            <div className={"flex flex-col justify-around"}>
                <h2 className={"font-semibold text-lg text-blue-500 indent-1 mt-8 uppercase px-0.5"}>{item.name}</h2>
                {data.stats.burntCardNumber ?
                    <Progress.Root className="bg-gray-400 h-3 relative overflow-hidden rounded-xl mx-1" value={data.stats.burntCardNumber / data.stats.totalCardNumber * 100}>
                        <Progress.Indicator className="bg-blue-400 h-full w-full"
                        style={{ transform: `translateX(-${100 - data.stats.burntCardNumber / data.stats.totalCardNumber * 100}%)` }}/>
                    </Progress.Root> :
                    <h3 className={"font-medium text-gray-500 text-sm indent-1 px-0.5"}>{data.stats.totalCardNumber} cards</h3>
                }
                {data.stats.burntCardNumber ?
                <Link to={`/learn/${item._id}`} className={"h-10 w-10 ml-3 bg-green-500 rounded-full grid place-items-center text-white hover:ring-2 ring-blue-300"}>
                    <PlayIcon className={"m-auto h-8 w-8"}/>
                </Link> :
                <Link to={`/learn/${item._id}`} className={"h-10 w-10 ml-3 bg-indigo-500 rounded-full grid place-items-center text-white hover:ring-2 ring-blue-300"}>
                    <BookOpenIcon className={"m-auto h-8 w-8"}/>
                </Link>}
                <div className={"flex flex-wrap gap-3"}>
                    {item.tags.map((tag, index) => <span key={index} className={"bg-gray-200 rounded-xl px-2 py-0.5 text-sm text-gray-700 hover:bg-pink-400 hover:text-white"}>{tag}</span>)}
                </div>

            </div>
        </div>
    )
}

Deck.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string)
    })
}

export default Deck