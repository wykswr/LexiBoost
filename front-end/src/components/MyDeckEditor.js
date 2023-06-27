import {Button, TextField} from "@mui/material";
import useSearchCard from "../hooks/useSearchCard";
import {Popover} from "@headlessui/react";
import {ChevronDoubleUpIcon, PlusCircleIcon, PlusIcon} from "@heroicons/react/24/outline";

const MyDeckEditor = ({id}) => {
    const [availableTags, selectedTags, tagsPending, {push}] = useSearchCard();

    return (
        <div className={"rounded-lg shadow bg-gray-50 grid grid-rows-4 md:w-96 mx-auto gap-6 p-2"}>
            <div >
                <TextField id="filled-basic" label="Filled" variant="filled" className={"w-full"}/>
                <div>
                    <h2 className={"mt-8 text-xl font-semibold text-gray-600"}>Tags</h2>
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
                                        <ChevronDoubleUpIcon
                                            className={"p-0.5 h-6 w-6 text-white bg-gray-600 rounded-full"}/> :
                                        <PlusIcon
                                            className={"p-0.5 h-6 w-6 text-white bg-gray-600 rounded-full hover:animate-spin"}/>
                                    }</Popover.Button>
                                </div>


                                <Popover.Panel>
                                    <div className={"bg-gray-300 mt-2 rounded-lg p-4 flex gap-6 flex-wrap"}>
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
                </div>
            </div>


            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue="Default Value"
            />

            <div>
                <h2 className={"text-xl font-semibold text-gray-600"}>Cards</h2>
                <p className={"flex items-center gap-3"}><span>300 words</span><button className={"hover:text-indigo-500"}><PlusCircleIcon className={"w-8 h-8"}/></button></p>
            </div>

            <Button variant="contained" className={"h-10 self-end"}>Contained</Button>
        </div>
    )
}

export default MyDeckEditor;