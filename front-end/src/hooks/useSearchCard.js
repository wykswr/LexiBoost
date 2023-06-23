import useArray from "./useArray";
import usePending from "./usePending";
import {useEffect} from "react";
import {getTags} from "../service/api";


const useSearchCard = () => {
    const [availableTags, {set}] = useArray([]);
    const [selectedTags, {push, remove}] = useArray([]);
    const [fetchTags, pending] = usePending(getTags);

    useEffect(() => {
        fetchTags().then((tags) => {
            set(tags);
        })
    }, [fetchTags, set]);

    return [availableTags, selectedTags, pending, {push, remove}];
}

export default useSearchCard;