import { Dialog } from '@headlessui/react'
import DeckDetail from "./DeckDetail";
import TypingBox from "./TypingBox";
import {XMarkIcon} from "@heroicons/react/24/outline";

const MyDialog = ({id, option, setOption}) => {
    const isOpen = !(option === "blank")

    return (
        <Dialog open={isOpen} onClose={setOption}>
            <div className="fixed w-1/3 mx-auto inset-0 grid grid-col-1 place-items-center gap-1 p-4 z-50">
            <Dialog.Panel>
                {option === "detail" && <div className={"relative"}>
                    <button onClick={setOption} className={"absolute -top-3.5 -right-3.5 p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                        <XMarkIcon className={"h-5 w-5"}/>
                    </button>
                    <DeckDetail id={id} />
                </div>
                    }
                {option === "edit" && <div className={"grid grid-col-1 place-items-center gap-1"}>
                    <TypingBox message={"Not connected......"}/>
                    <button onClick={setOption} className={"p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                        <XMarkIcon className={"h-5 w-5"}/>
                    </button>
                </div>}
                {option === "delete" && <div className={"grid grid-col-1 place-items-center gap-1"}>
                    <TypingBox message={"Are you sure to delete this?"}/>
                    <button onClick={setOption} className={"p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                        <XMarkIcon className={"h-5 w-5"}/>
                    </button>
                </div>}
            </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default MyDialog;
