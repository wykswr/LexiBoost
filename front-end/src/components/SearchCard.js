import useAutoSearch from "../hooks/useAutoSearch";
import useSearchCard from "../hooks/useSearchCard";
import AutoSearch from "./AutoSearch";
import {Popover} from '@headlessui/react'
import {ChevronDoubleUpIcon, PlusIcon} from "@heroicons/react/24/outline";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useState} from "react";

const SearchCard = () => {
    const [selectedDeck, query, filteredDecks, pending, {setSelected, setQuery}] = useAutoSearch();
    const [availableTags, selectedTags, tagsPending, {push}] = useSearchCard();
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    return (
        <div className={"p-3 w-full rounded-xl shadow-md hover:shadow-xl"}>
            <div role={"search"} className={"container mx-auto flex justify-center"}>
                <AutoSearch setSelected={setSelected} query={query} filteredDecks={filteredDecks}
                            pending={pending} selectedDeck={selectedDeck} setQuery={setQuery}
                            className={"w-full z-10"}/>
            </div>

            <Popover className={"mt-8"}>
                {({open}) => (
                    <>
                        <div className={"flex gap-6 flex-wrap"}>
                            {tagsPending || selectedTags.map((tag) => (<div
                                key={tag}
                                className={"bg-gray-200 rounded-xl px-2 py-0.5 text-sm font-semibold text-gray-700 hover:bg-pink-300"}>
                                {tag}
                            </div>))}
                            <Popover.Button>{open ?
                                <ChevronDoubleUpIcon className={"p-0.5 h-6 w-6 text-white bg-gray-600 rounded-full"}/> :
                                <PlusIcon className={"p-0.5 h-6 w-6 text-white bg-gray-600 rounded-full"}/>
                            }</Popover.Button>
                        </div>


                        <Popover.Panel>
                            <div className={"bg-gray-300 mt-2 rounded-lg p-2 flex gap-6 flex-wrap"}>
                                {availableTags.map((tag) => (
                                    <button
                                        onClick={() => push(tag)}
                                        className={"bg-blue-400 text-white rounded-xl px-2 py-0.5 text-sm font-semibold hover:bg-pink-300"}
                                        key={tag}>
                                        {tag}
                                    </button>))}
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>

            <div className={"mt-8"}>
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
            </div>
        </div>
    );
}

export default SearchCard;