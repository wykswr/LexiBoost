import {useEffect, useState} from 'react';
import CardAddition from "../components/CardAddition.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchDeck} from "../redux/cardEdit/thunk.js";
import useCounter from "../hooks-decrepit/useCounter.js";
import {ArrowPathIcon} from "@heroicons/react/20/solid";
import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/react/24/solid";
import {PlusCircleIcon} from "@heroicons/react/24/outline";


const EditCard = () => {
    const {deckId} = useParams();
    const dispatch = useDispatch();
    const cards = useSelector(state => state.cardEdit.cards);
    const pending = useSelector(state => state.cardEdit.pending);
    const [counter, {increment, decrement}] = useCounter(0);
    const vocabs = [0, 1, 2, 3, 4].map(i =>
        counter + i).filter(i => i < cards.length);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        dispatch(fetchDeck(deckId));
    }, [dispatch, deckId])

    return (
        <div className={"container mx-auto py-6"}>
            {pending ?
                <ArrowPathIcon className={"h-64 w-64 animate-spin text-gray-500 mx-auto mt-64"}/> :
                <div>
                    <div className={"flex flex-wrap gap-3"}>
                        {vocabs[0] > 0 && <button onClick={decrement} className={"self-end"}>
                            <ChevronDoubleLeftIcon className={"h-6 w-6 hover:text-indigo-500"}/>
                        </button>}

                        {vocabs.map(i => <button
                            key={i}
                            className={"bg-gray-50 shadow-sm border-t-2 border-l-2 border-r-2 border-gray-300 rounded-t-lg p-1"}
                            onClick={() => setSelectedCard(cards[i]._id)}>
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

                    <CardAddition deckId={deckId} cardId={selectedCard}/>
                </div>}
        </div>
    )
}

export default EditCard