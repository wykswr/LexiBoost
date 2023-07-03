import {PlusIcon} from "@heroicons/react/20/solid";
import {useState} from "react";
import {Dialog} from "@headlessui/react";
import DeckEditor from "./DeckEditor";
import {XMarkIcon} from "@heroicons/react/24/outline";

const CreateDeck = () => {
    let [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="w-full h-80  rounded-xl shadow-md hover:shadow-xl bg-gray-100
             grid grid-cols-1 items-stretch md:w-96 md:h-64 group">
                <div
                    onClick={() => setIsOpen(true)}
                    className={"h-32 w-32 rounded-xl border-gray-500 border-4 m-auto grid grid-cols-1 place-items-center group-hover:border-indigo-500 cursor-pointer"}>
                    <PlusIcon className={"h-28 w-28 text-gray-500 group-hover:text-indigo-500"}/>
                </div>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="fixed left-0 right-0 top-0 bottom-0 z-50 grid grid-cols-1 place-items-center backdrop-blur">
                    <Dialog.Panel className={"relative"}>
                        <DeckEditor/>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={"absolute -top-3.5 -right-3.5 p-1 bg-indigo-500 rounded-full text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}>
                            <XMarkIcon className={"h-5 w-5"}/>
                        </button>
                    </Dialog.Panel>
                </div>

            </Dialog>
        </>
    );
}

export default CreateDeck;