import {Cog6ToothIcon, PencilSquareIcon, PlusIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import fakeDecks from "../assets/fakeDecks.json";
import Book from "../components/Book";

function BookshelfPage() {
    const [decks, setDecks] = useState([]);
    useEffect(() => {
        setDecks([1, 2, 3 ,4 ,5, 6])
    }, []);
    return (
        <div className={"container md:mt-8 mx-auto md:flex"}>
            <aside className={"flex flex-row-reverse md:flex-col md:order-2 md:items-center"}>
                <Cog6ToothIcon className={"h-8 w-8 m-2 hover:text-indigo-500 md:cursor-pointer"}/>
                <PlusIcon className={"h-8 w-8 m-2 hover:text-indigo-500 md:cursor-pointer"}/>
                <PencilSquareIcon className={"h-8 w-8 m-2 hover:text-indigo-500 md:cursor-pointer"}/>
            </aside>
            <div className={"flex flex-col gap-6 md:flex-row md:flex-wrap"}>
                {decks.map(deck => <Book key={deck} id={deck}/>)}
            </div>

        </div>
    )
}

export default BookshelfPage;