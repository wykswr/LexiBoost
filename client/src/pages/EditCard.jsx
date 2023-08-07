import {useEffect, useState} from 'react';
import CardUpdate from "../components/CardUpdate.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchDeck} from "../redux/cardEdit/thunk.js";
import useCounter from "../hooks/useCounter.js";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/react/24/solid";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import NavBar from "../components/shared/NavBar.jsx";
import {useGetFlashCardsQuery} from '../redux/api/apiSlice.js'
import CardAddition from "../components/CardAddition.jsx";


const EditCard = () => {
    const {deckId} = useParams();
    const {data, isLoading} = useGetFlashCardsQuery(deckId);
    const [counter, {increment, decrement}] = useCounter(0);
    const [selectedCard, setSelectedCard] = useState(null);

    if (isLoading)
        return null;

    const cards = data.flashcards;

    const vocabs = [0, 1, 2, 3, 4].map(i =>
        counter + i).filter(i => i < cards.length);
    const selectedCardID = cards.includes(selectedCard) ? selectedCard._id : null;

    return (
        <>
            <NavBar/>
            <div className={"container mx-auto pt-16"}>
                <div>
                    <div className={"flex flex-wrap gap-3"}>
                        {vocabs[0] > 0 && <button onClick={decrement} className={"self-end"}>
                            <ChevronDoubleLeftIcon className={"h-6 w-6 hover:text-indigo-500"}/>
                        </button>}

                        {vocabs.map(i => <button
                            key={i}
                            className={"bg-gray-50 shadow-sm border-t-2 border-l-2 border-r-2 border-gray-300 rounded-t-lg p-1"}
                            onClick={() => {
                                setSelectedCard(cards[i]);
                            }}>
                            {cards[i].spelling}
                        </button>)}

                        {vocabs[vocabs.length - 1] < cards.length - 1 &&
                            <button onClick={increment} className={"self-end"}>
                                <ChevronDoubleRightIcon className={"h-6 w-6 hover:text-indigo-500"}/>
                            </button>}

                        <button onClick={() => setSelectedCard(null)}>
                            <PlusCircleIcon className={"h-8 w-8 hover:text-indigo-500 text-gray-500"}/>
                        </button>
                    </div>

                    {selectedCardID ? <CardUpdate key={selectedCardID} deckId={deckId} cardId={selectedCardID}/> : <CardAddition deckId={deckId} />}
                </div>
        </div>
        </>
    )
}

export default EditCard