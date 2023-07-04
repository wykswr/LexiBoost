import {Button, TextField} from "@mui/material";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import TagSelector from "./shared/TagSelector";
import {BeakerIcon} from "@heroicons/react/20/solid";
import {DocumentArrowUpIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";


const DeckEditor = ({id}) => {
    return (
        <div
            className={"rounded-lg shadow bg-gray-50 flex flex-col md:w-96 max-h-screen mx-auto gap-6 p-4 border-2 border-blue-300"}>
            {id !== undefined || <h1 className={"uppercase text-xl font-semibold text-gray-600 mx-auto"}>create new deck</h1>}
            <div>
                <div>
                    <TextField id="standard-basic" variant="filled" label={"Title"} className={"w-full bg-gray-200"}/></div>
                <div>
                    <h2 className={"mt-8 text-xl font-semibold text-gray-600"}>Tags</h2>
                    <TagSelector className={"mt-1"}/>
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
                label="Description"
                multiline
                rows={4}
                className={"bg-gray-200"}
            />

            {id !== undefined && <div>
                <h2 className={"text-xl font-semibold text-gray-600"}>Cards</h2>
                <p className={"flex items-center gap-9 text-gray-500"}><span>300 cards</span>
                    <Link to={"/add_card"} className={"hover:text-indigo-500"}><PlusCircleIcon className={"w-7 h-7"}/></Link>
                </p>
            </div>}

            {id !== undefined ?
            <Button variant="contained" className={"h-10 place-self-center w-24"}>Confirm</Button> :
            <div className={"grid grid-cols-2 place-items-center"}>
                <Button variant="contained" className={"h-10 w-32 relative"}>
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