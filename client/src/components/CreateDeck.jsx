import {PlusIcon} from "@heroicons/react/20/solid";
import {useDispatch} from "react-redux";
import {setSelected} from "../redux/dialog/reducer.js";

const CreateDeck = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setSelected({id: null, selected: "Create"}))
    }
    return (
        <div className="w-full h-80  rounded-lg shadow-md hover:shadow-xl bg-gray-100
             grid grid-cols-1 items-stretch md:w-96 md:h-64 group">
            <div
                onClick={handleClick}
                className={"h-32 w-32 rounded-xl border-gray-500 border-4 m-auto grid grid-cols-1 place-items-center group-hover:border-indigo-500 cursor-pointer"}>
                <PlusIcon className={"h-28 w-28 text-gray-500 group-hover:text-indigo-500"}/>
            </div>
        </div>

    );
}

export default CreateDeck;