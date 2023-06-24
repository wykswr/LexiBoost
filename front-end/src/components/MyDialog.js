import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import DeckDetail from "./DeckDetail";
import DeckEditor from "./DeckEditor";

const MyDialog = ({id, option, setOption}) => {
    const isOpen = !(option === "blank")

    return (
        <Dialog open={isOpen} onClose={setOption}>
            <div className="fixed w-1/3 mx-auto inset-0 grid grid-col-1 place-items-center p-4">
            <Dialog.Panel>
                {option === "detail" && <DeckDetail id={id} />}
                {option === "edit" && <div className={"w-64 h-64"}/>}
                {option === "edit" && <span> Are you sure you want to delete this deck </span>}
            </Dialog.Panel>
                <button onClick={setOption} className={"mx-auto my-3 py-1 bg-indigo-500 w-full text-xl rounded-md text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300"}> Cancel </button>
            </div>
        </Dialog>
    )
}

export default MyDialog;
