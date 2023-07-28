import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import TagSelector from "./shared/TagSelector.jsx";
import {useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setName, setTags, setSort} from "../redux/search/reducer.js";

const SearchCard = () => {
    const nameRef = useRef();
    const [search, setSearch] = useState("rating");
    const selectedTags = useSelector((state) => state.tagSelect.selectedTags);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setName(nameRef.current.value));
        dispatch(setTags(selectedTags));
        dispatch(setSort(search));
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div className={"p-3 w-full rounded-lg shadow-md bg-gray-100"}>
            <div role={"search"} className={"container mx-auto flex justify-center"}>
                <input type="text" className={"bg-white w-full border border-gray-500 p-1 rounded caret-pink-500"}
                       ref={nameRef}/>
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
                        <FormControlLabel value="rating" control={<Radio/>} label="rating"/>
                        <FormControlLabel value="recent" control={<Radio/>} label="recent"/>
                        <FormControlLabel value="card number" control={<Radio/>} label="card number"/>
                    </RadioGroup>
                </FormControl>

                <button className={"self-end"} onClick={handleClick}>
                    <MagnifyingGlassIcon
                        className={"w-8 h-8 m-1 bg-gray-600 text-white rounded-full p-1 hover:bg-emerald-500"}/>
                </button>
            </div>
        </div>
    );
}

export default SearchCard;