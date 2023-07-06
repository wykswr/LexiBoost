import usePending from "./usePending";
import {getDeck} from "../service/deck";
import {useEffect, useState} from "react";
import useProgress from "./useProgress";
import {getProgress} from "../service/fakeDeck";


const useDeck = (id, inMarket) => {
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
                if (inMarket) return;
                fetchProgress(deck.id)
                    .then((progress) => {
                        setTicks(progress.burned, progress.total);
                    })
            })
    }, [fetchDeck, fetchProgress, id, inMarket, setTicks]);

    return [deck, progress, percent, pending];
}

export default useDeck;