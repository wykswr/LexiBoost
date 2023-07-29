import {PlusIcon} from "@heroicons/react/20/solid";
import {setSelected} from "../redux/dialog/reducer.js";
import {useDispatch} from "react-redux";

const CreateDeck = () => {
    const dispatch = useDispatch();
    return (
        <div className="w-full h-80  rounded-xl shadow-md hover:shadow-xl bg-gray-100
             grid grid-cols-1 items-stretch md:w-96 md:h-64 group">
            <div
                onClick={() => dispatch(setSelected({selected: "Create", id: null}))}
                className={"h-32 w-32 rounded-xl border-gray-500 border-4 m-auto grid grid-cols-1 place-items-center group-hover:border-indigo-500 cursor-pointer"}>
                <PlusIcon className={"h-28 w-28 text-gray-500 group-hover:text-indigo-500"}/>
            </div>
        </div>
    );
}

export default CreateDeck;