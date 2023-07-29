import {useDispatch} from "react-redux";
import {resetSelected} from "../../redux/dialog/reducer.js";
import {ArrowPathIcon, CheckIcon} from "@heroicons/react/24/outline/index.js";
import PropTypes from "prop-types";
import {TrashIcon, NoSymbolIcon} from "@heroicons/react/20/solid/index.js";
import {useSoftDeleteDeckMutation} from "../../redux/api/apiSlice.js";

const SoftDelete = ({id}) => {
    const [softDelete, {isLoading, isSuccess, error}] = useSoftDeleteDeckMutation();
    const dispatch = useDispatch();
    if (isSuccess) {
        return (
            <div className={"w-96"}>
            <CheckIcon className={"animate-pulse w-40 h-40 mx-auto text-teal-500 mx-auto"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Removed from Bookshelf</h1>
        </div>
        );
    }
    if (isLoading) {
        return (
            <div className={"w-96"}>
                <ArrowPathIcon className={"animate-spin w-40 h-40 text-gray-500 mx-auto"}/>
                <h1 className={"text-gray-500 text-xl font-semibold"}>Content is loading...</h1>
            </div>
        );
    }
    if (error) {
        return (
            <div className={"w-96"}>
                <ArrowPathIcon className={"animate-bounce w-40 h-40 text-gray-500 mx-auto"}/>
                <h1 className={"text-gray-500 text-xl font-semibold"}>Something goes wrong!</h1>
            </div>
        );
    }
    return (
        <div className={"w-96 border border-blue-400 rounded-lg p-1.5 bg-white"}>
            <h2 className={"text-lg font-semibold text-center text-red-400"}>Delete an item</h2>
            <p className={"mt-3"}>Are you sure to do this? The deck will be removed from your bookshelf.</p>

            <div className={"mt-6 flex justify-center gap-5"}>
                <button onClick={() => softDelete(id)} className={"bg-red-500 rounded-full p-1 hover:bg-red-600"}>
                    <TrashIcon className={"w-5 h-5 text-white"}/>
                </button>
                <button onClick={() => dispatch(resetSelected())} className={"bg-gray-500 rounded-full p-1 hover:bg-gray-600"}>
                    <NoSymbolIcon className={"w-5 h-5 text-white"}/>
                </button>
            </div>

        </div>
    );
}

SoftDelete.propTypes = {
    id: PropTypes.string.isRequired,
}

export default SoftDelete