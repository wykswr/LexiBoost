import usePending from "./usePending";
import {searchDecks} from "../service/api";
import {useState, useEffect} from "react";

const useAutoSearch = () => {
    const [selectedDeck, setSelectedDeck] = useState("");
    const [query, setQuery] = useState("");
    const [filteredDecks, setFilteredDecks] = useState([]);
    const [fetchMatched, matchPending] = usePending(searchDecks);
    const setSelected = (deck) => {
        setSelectedDeck(deck);
        setQuery(deck);
    }


    useEffect(() => {
        if (query) {
            fetchMatched(query).then((decks) => {
                setFilteredDecks(decks);
            });
        }
    }, [fetchMatched, query]);

    return [selectedDeck, query, filteredDecks, matchPending, {setSelected, setQuery}];
}

export default useAutoSearch;
