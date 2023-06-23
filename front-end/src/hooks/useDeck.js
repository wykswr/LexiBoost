import usePending from "./usePending";
import {getDeck, getProgress} from "../service/api";
import {useEffect, useState} from "react";
import useProgress from "./useProgress";


const useDeck = (id) => {
    const [fetchDeck, deckPending] = usePending(getDeck);
    const [fetchProgress, progressPending] = usePending(getProgress);
    const pending = deckPending || progressPending;
    const [deck, setDeck] = useState({});
    const [progress, percent, {setTicks}] = useProgress();

    useEffect(() => {
        fetchDeck(id)
            .then((deck) => {
                setDeck(deck);
                return deck;
            })
            .then((deck) => {
                fetchProgress(deck.id)
                    .then((progress) => {
                        setTicks(progress.burned, progress.total);
                    })
            })
    }, [deck.id, fetchDeck, fetchProgress, id, setTicks]);

    return [deck, progress, percent, pending];
}

export default useDeck;