import {Dialog} from '@headlessui/react'
import DeckDetail from "./DeckDetail";
import TypingBox from "./shared/TypingBox";
import {XMarkIcon, CheckIcon} from "@heroicons/react/24/outline";
import DeckEditor from "./DeckEditor";
import {removeDeck} from "../redux/bookshelf/reducer";
import {useDispatch} from "react-redux";

const MyDialog = ({id, option, setOption}) => {
    const isOpen = !(option === "blank")
    const dispatch = useDispatch();

    return (
        <Dialog open={isOpen} onClose={setOption}>
            <div className="fixed left-0 right-0 top-0 bottom-0 grid grid-col-1 place-items-center gap-1 p-4 z-50 backdrop-blur">
                <Dialog.Panel className={"w-1/3"}>
                    {option === "detail" && <div className={"relative"}>
                        <button onClick={setOption}
                                className={"absolute -top-3.5 -right-3.5 p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                            <XMarkIcon className={"h-5 w-5"}/>
                        </button>
                        <DeckDetail id={id}/>
                    </div>
                    }
                    {option === "edit" && <div className={"grid grid-col-1 place-items-center gap-1 relative"}>
                        <button onClick={setOption}
                                className={"absolute -top-3.5 right-10 p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                            <XMarkIcon className={"h-5 w-5"}/>
                        </button>
                        <DeckEditor id={id}/>
                    </div>}
                    {option === "delete" && <div className={"grid grid-col-1 place-items-center gap-1 bg-gray-100 p-2 rounded-lg border-2 border-blue-300"}>
                        <h2 className={"uppercase text-xl font-semibold text-gray-600 mx-auto mb-2"}>Delete Deck</h2>
                        <TypingBox message={"Are you sure to delete this?"}/>
                        <div className={"flex justify-center gap-5 mt-4"}>
                            <button onClick={() => {dispatch(removeDeck(id)); setOption();}}
                                    className={"p-1 bg-red-500 rounded-full text-white hover:bg-red-800 transform hover::scale-105 transition-transform duration-300"}>
                                <CheckIcon className={"h-5 w-5"}/>
                            </button>
                            <button onClick={setOption}
                                    className={"p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                                <XMarkIcon className={"h-5 w-5"}/>
                            </button>
                        </div>

                    </div>}
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default MyDialog;
