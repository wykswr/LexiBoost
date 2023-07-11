import useAutoSearch from "../hooks-decrepit/useAutoSearch.js";
import AutoSearch from "./shared/AutoSearch.jsx";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useDispatch} from 'react-redux';
import {defQuery, defSort, defTags} from "../redux/marketPlace/reducer.js";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import TagSelector from "./shared/TagSelector.jsx";

const SearchCard = () => {
    const [selectedDeck, query, filteredDecks, pending, {setSelected, setQuery}] = useAutoSearch();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(defSort(event.target.value));
    }

    const handleSearch = () => {
        dispatch(defQuery(query));
    }


    return (
        <div className={"p-3 w-full rounded-xl shadow-md hover:shadow-xl bg-gray-50"}>
            <div role={"search"} className={"container mx-auto flex justify-center"}>
                <AutoSearch setSelected={setSelected} query={query} filteredDecks={filteredDecks}
                            pending={pending} selectedDeck={selectedDeck} setQuery={setQuery}
                            className={"w-full z-10"}/>
            </div>

            <TagSelector className={"mt-4"}/>

            <div className={"mt-8 flex justify-between"}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sort by:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="likes" control={<Radio/>} label="likes"/>
                        <FormControlLabel value="recent" control={<Radio/>} label="recent"/>
                        <FormControlLabel value="cards" control={<Radio/>} label="cards"/>
                    </RadioGroup>
                </FormControl>

                <button onClick={handleSearch}
                        className={"self-end"}
                ><MagnifyingGlassIcon className={"w-8 h-8 m-1 bg-gray-600 text-white rounded-full p-1 hover:bg-emerald-500"}/></button>
            </div>
        </div>
    );
}

export default SearchCard;