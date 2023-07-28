import PropTypes from "prop-types";
import {ArrowDownTrayIcon} from "@heroicons/react/20/solid/index.js";
import {useImportDeckMutation} from "../redux/api/apiSlice.js";
import {ArrowPathIcon} from "@heroicons/react/24/outline/index.js";


const Good = ({item}) => {
    const [importDeck, {isLoading, isError, isSuccess}] = useImportDeckMutation();

    const handleImport = () => {
        importDeck(item._id)
    }

    if (isLoading) return (
        <div className="w-full h-80 rounded-lg shadow grid items-stretch md:w-96 md:h-64">
            <ArrowPathIcon className={"h-32 w-32 animate-spin text-gray-500 m-auto"}/>
        </div>
    )
    if (isError) return (
        <div className="w-full h-80 rounded-lg shadow grid items-stretch md:w-96 md:h-64">
            <div className={"flex flex-col justify-center items-center h-full"}>
                <h2 className={"text-red-500 font-semibold text-lg"}>Already in bookshelf</h2>
            </div>
        </div>
    )
    if (isSuccess) return (
        <div className="w-full h-80 rounded-lg shadow grid items-stretch md:w-96 md:h-64">
            <div className={"flex flex-col justify-center items-center h-full"}>
                <h2 className={"text-green-500 font-semibold text-lg"}>Success</h2>
                <p className={"text-green-500"}>Deck imported</p>
            </div>
        </div>
    )
    return (
        <div className="w-full h-80 md:w-96 md:h-64 grid grid-cols-2 place-items-stretch rounded-lg overflow-hidden bg-gray-50 shadow relative">
            <img src={item.cover} alt={item.name} className={"object-cover"}/>
            <div className={"flex flex-col justify-around"}>
                <h2 className={"font-semibold text-lg text-blue-500 indent-1 mt-8 uppercase px-0.5"}>{item.name}</h2>
                <button className={"h-10 w-10 ml-3 bg-pink-400 rounded-full grid place-items-center text-white hover:ring-2 ring-blue-300"} onClick={handleImport}>
                    <ArrowDownTrayIcon className={"m-auto h-8 w-8"}/>
                </button>
                <div className={"flex flex-wrap gap-3"}>
                    {item.tags.map((tag, index) => <span key={index} className={"bg-gray-200 rounded-xl px-2 py-0.5 text-sm text-gray-700 hover:bg-pink-400 hover:text-white"}>{tag}</span>)}
                </div>
            </div>
        </div>
    )
}

Good.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string)
    })
}

export default Good