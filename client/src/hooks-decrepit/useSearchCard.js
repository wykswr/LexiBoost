import useArray from "./useArray.js";
import usePending from "./usePending.js";
import {useEffect} from "react";
import {getTags} from "../service-decrepit/api.js";


const useSearchCard = (defaultTags) => {
    const [availableTags, {set}] = useArray([]);
    const [selectedTags, {push, remove}] = useArray([]);
    defaultTags && defaultTags.forEach((tag) => push(tag));
    const [fetchTags, pending] = usePending(getTags);

    useEffect(() => {
        fetchTags().then((tags) => {
            set(tags);
        })
    }, [fetchTags, set]);

    return [availableTags, selectedTags, pending, {push, remove}];
}

export default useSearchCard;