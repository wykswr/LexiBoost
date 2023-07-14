import {Button, TextField} from "@mui/material";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import TagSelector from "./TagSelector.jsx";
import {BeakerIcon} from "@heroicons/react/20/solid";
import {useRef} from "react";
import PropTypes from "prop-types";
import {useAddDeckMutation} from "../../redux/api/apiSlice.js";
import {useDispatch} from "react-redux";
import {resetSelected} from "../../redux/dialog/reducer.js";


const DeckCreate = () => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const tagsRef = useRef();
    const [addDeck, {isSuccess}] = useAddDeckMutation();
    const dispatch = useDispatch();

    const handleCreate = () => {
        const name = nameRef.current.children[1].children[0].value;
        const description = descriptionRef.current.children[1].children[0].value;
        let tags = tagsRef.current.children;
        let tagsList = [];
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].type !== "button") {
                tagsList.push(tags[i].children[0].innerText);
            }
        }
        const randID = Math.floor(Math.random() * 5) * 100 + 100;
        const deck = {
            name: name,
            description: description,
            cover: `https://picsum.photos/${randID}`,
            tags: tagsList,
            flashCards: []
        }
        addDeck(deck);
    }

    if (isSuccess) {
        dispatch(resetSelected());
    }


    return (
        <div className={"rounded-lg shadow bg-gray-50 flex flex-col md:w-96 max-h-screen mx-auto gap-6 p-4 border-2 border-blue-300"}>

            <h1 className={"uppercase text-xl font-semibold text-gray-600 mx-auto"}>create new deck</h1>
            <div>
                <div>
                    <TextField id="standard-basic" variant="filled" label={"Name"} className={"w-full bg-gray-200 "}
                               ref={nameRef}/></div>
                <div>
                    <h2 className={"mt-8 text-xl font-semibold text-gray-600"}>Tags</h2>
                    <TagSelector className={"mt-1"} ref={tagsRef}/>
                </div>
            </div>

            <div>
                <h2 className={"text-xl font-semibold text-gray-600"}>Cover</h2>
                <div className={"text-gray-500"}>
                    <span className={"text-start"}>Upload image:</span>
                    <DocumentArrowUpIcon className={"w-6 h-6 inline mx-3 cursor-pointer hover:text-pink-400"}/>
                </div>
            </div>


            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                className={"bg-gray-200"}
                label="Description"
                ref={descriptionRef}/>

                <div className={"grid grid-cols-2 place-items-center"}>
                    <Button variant="contained" className={"h-10 w-32 relative"} onClick={handleCreate}>
                        Create
                    </Button>
                    <Button variant="contained" className={"h-10 bg-fuchsia-400 hover:bg-fuchsia-500 w-40 relative"}>
                        AI generate
                        <BeakerIcon className={"absolute top-2.5 right-0 w-5 h-5 mx-1"}/>
                    </Button>
                </div>
        </div>
    )
}

DeckCreate.propTypes = {
    id: PropTypes.string
}

export default DeckCreate;