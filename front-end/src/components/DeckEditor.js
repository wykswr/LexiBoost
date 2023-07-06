import {Button, TextField} from "@mui/material";
import {DocumentArrowUpIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import TagSelector from "./shared/TagSelector";
import {BeakerIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import {createDeckAsync, editDeckAsync} from "../redux/deckEdit/thunk";
import {useDispatch} from "react-redux";
import {useRef} from "react";

const DeckEditor = ({id}) => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const tagsRef = useRef();
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
        const deck = {
            name: name,
            description: description,
            cover: "https://picsum.photos/100",
            tags: tagsList
        }
        if (id !== undefined) {
            deck.id = id;
            dispatch(editDeckAsync(deck));
        } else
        {dispatch(createDeckAsync(deck));}
    }

    return (
        <div
            className={"rounded-lg shadow bg-gray-50 flex flex-col md:w-96 max-h-screen mx-auto gap-6 p-4 border-2 border-blue-300"}>
            {id !== undefined ||
                <h1 className={"uppercase text-xl font-semibold text-gray-600 mx-auto"}>create new deck</h1>}
            <div>
                <div>
                    <TextField id="standard-basic" variant="filled" label={"Title"} className={"w-full bg-gray-200 "}
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
                ref={descriptionRef}
            />

            {id !== undefined && <div>
                <h2 className={"text-xl font-semibold text-gray-600"}>Cards</h2>
                <p className={"flex items-center gap-9 text-gray-500"}><span>300 cards</span>
                    <Link to={"/add_card"} className={"hover:text-indigo-500"}><PlusCircleIcon
                        className={"w-7 h-7"}/></Link>
                </p>
            </div>}

            {id !== undefined ?
                <Button variant="contained" className={"h-10 place-self-center w-24"} onClick={handleCreate}>Confirm</Button> :
                <div className={"grid grid-cols-2 place-items-center"}>
                    <Button variant="contained" className={"h-10 w-32 relative"} onClick={handleCreate}>
                        Create
                    </Button>
                    <Button variant="contained" className={"h-10 bg-fuchsia-400 hover:bg-fuchsia-500 w-40 relative"}>
                        AI generate
                        <BeakerIcon className={"absolute top-2.5 right-0 w-5 h-5 mx-1"}/>
                    </Button>
                </div>
            }
        </div>
    )
}

export default DeckEditor;