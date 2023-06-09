import Deck from "../components/Deck";
import {Cog6ToothIcon, PencilSquareIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import fakeDecks from "../assets/fakeDecks";

function BookShelf() {
    const [decks, setDecks] = useState([]);
    useEffect(() => {
        setDecks(fakeDecks.decks)
    }, []);
    return (
        <div className={"container md:mt-8 mx-auto md:flex"}>
            <aside className={"flex flex-row-reverse md:flex-col md:order-2 md:items-center"}>
                <Cog6ToothIcon className={"h-8 w-8 m-2 hover:text-indigo-500"}/>
                <PlusIcon className={"h-8 w-8 m-2 hover:text-indigo-500"}/>
                <PencilSquareIcon className={"h-8 w-8 m-2 hover:text-indigo-500"}/>
            </aside>
            <div className={"md:flex md:flex-wrap md:content-center md:gap-5"}>
                {decks.map((deck) => (<Deck deck={deck}/>))}
            </div>

        </div>
    )
}

export default BookShelf;