import {Dialog} from '@headlessui/react'
import DeckDetail from "./DeckDetail";
import TypingBox from "./TypingBox";
import {XMarkIcon, CheckIcon} from "@heroicons/react/24/outline";
import MyDeckEditor from "./MyDeckEditor";

const MyDialog = ({id, option, setOption}) => {
    const isOpen = !(option === "blank")

    return (
        <Dialog open={isOpen} onClose={setOption}>
            <div className="fixed w-1/3 mx-auto inset-0 grid grid-col-1 place-items-center gap-1 p-4 z-50">
                <Dialog.Panel>
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
                                className={"absolute -top-3.5 -right-3.5 p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                            <XMarkIcon className={"h-5 w-5"}/>
                        </button>
                        <MyDeckEditor id={id}/>
                    </div>}
                    {option === "delete" && <div className={"grid grid-col-1 place-items-center gap-1 bg-gray-100 p-2 rounded-lg border border-gray-500"}>
                        <h2 className={"text-lg font-semibold mb-2"}>Delete Deck</h2>
                        <TypingBox message={"Are you sure to delete this?"}/>
                        <div className={"flex justify-center gap-5 mt-4"}>
                            <button onClick={setOption}
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
