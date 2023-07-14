import {Dialog} from '@headlessui/react'
import DeckDetail from "../DeckDetail.jsx";
import {XMarkIcon} from "@heroicons/react/24/outline";
import DeckEditor from "../DeckEditor.jsx";
import {useDispatch, useSelector} from "react-redux";
import {resetSelected} from "../../redux/dialog/reducer.js";
import SoftDelete from "./SoftDelete.jsx";


const MyDialog = () => {
    const selected = useSelector(state => state.dialog.selected);
    const id = useSelector(state => state.dialog.id);
    const isOpen = selected !== null;
    const dispatch = useDispatch();
    const setOption = () => {
        dispatch(resetSelected());
    }

    return (
        <Dialog open={isOpen} onClose={setOption}>
            <div
                className="fixed left-0 right-0 top-0 bottom-0 grid grid-col-1 place-items-center gap-1 p-4 z-50 backdrop-blur">
                <Dialog.Panel className={"w-1/3"}>
                    {selected === "Detail" && <div className={"relative"}>
                        <button onClick={setOption}
                                className={"absolute -top-3.5 -right-3.5 p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                            <XMarkIcon className={"h-5 w-5"}/>
                        </button>
                        <DeckDetail id={id}/>
                    </div>
                    }
                    {selected === "Edit" && <div className={"grid grid-col-1 place-items-center gap-1 relative"}>
                        <DeckEditor id={id}/>
                    </div>}
                    {selected === "Delete" && <SoftDelete id={id}/>}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default MyDialog;
