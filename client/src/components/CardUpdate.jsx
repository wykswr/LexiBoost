import {Button} from "@mui/material";
import {useRef} from "react";
import {
    useDeleteFlashCardMutation,
    useGetSingleFlashCardQuery,
    useUpdateFlashCardMutation
} from "../redux/api/apiSlice.js";


const CardUpdate = ({deckId, cardId}) => {
    const {data, isLoading, isError} = useGetSingleFlashCardQuery({deckId, cardId});

    const [deleteCard, {isDeleting}] = useDeleteFlashCardMutation();
    const [updateCard, {isUpdating}] = useUpdateFlashCardMutation();

    const defRef = useRef(null);
    const exRef = useRef(null);
    const spellingRef = useRef(null);
    const pronunciationRef = useRef(null);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    const handleDeletion = () => {
        deleteCard({cardId, deckId});
    }

    const handleClick = () => {
        let currentDefs = [];
        for (let i = 0; i < defRef.current.children.length; i++) {
            currentDefs.push(defRef.current.children[i].value);
        }
        currentDefs = currentDefs.filter(def => def.trim() !== "");
        let currentExample = [];
        for (let i = 0; i < exRef.current.children.length; i++) {
            currentExample.push(exRef.current.children[i].value);
        }

        currentExample = currentExample.filter(ex => ex.trim() !== "");

        let currentSpelling = spellingRef.current.value;
        let currentPronunciation = pronunciationRef.current.value;

        let newCard = {
            spelling: currentSpelling,
            pronunciation: currentPronunciation,
            definition: currentDefs,
            examples: currentExample
        }
        console.log(newCard);
        updateCard({deckId, cardId, content: newCard});
    }

    return (
        <div className={"grid grid-cols-1 items-stretch gap-10"}>
            <h1 className={"text-xl font-semibold text-indigo-500"}>{cardId}</h1>
            <div className={"flex flex-col gap-3"}>
                <label htmlFor='spelling'
                       className="block  text-sm font-medium leading-6 text-gray-900"> Spelling </label>
                <input type='text' required id="spelling"
                       className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"}
                       defaultValue={data.flashCard.spelling}
                       ref={spellingRef}/>
                <label htmlFor='pronunciation' className={""}> Pronunciation </label>
                <input type='text' id="pronunciation" defaultValue={data.flashCard.pronunciation}
                       className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"}
                       ref={pronunciationRef}/>
            </div>

            <div className={"flex flex-col gap-3"}>
                <label htmlFor={"definitions"}>Definitions</label>
                <div className={"flex flex-col gap-3"} ref={defRef}>

                    <textarea defaultValue={data.flashCard.definition[0] || ""}
                              className={"border-2 border-gray-300 rounded-md h-16"}/>
                    <textarea defaultValue={data.flashCard.definition[1] || ""}
                              className={"border-2 border-gray-300 rounded-md h-16"}/>
                    <textarea defaultValue={data.flashCard.definition[2] || ""}
                              className={"border-2 border-gray-300 rounded-md h-16"}/>

                </div>
            </div>

            <div className={"flex flex-col gap-3"}>
                <label htmlFor={"example"}>Example Sentences</label>
                <div className={"flex flex-col gap-3"} ref={exRef}>

                    <textarea defaultValue={data.flashCard.examples[0] || ""}
                              className={"border-2 border-gray-300 h-16 rounded-md"}/>
                    <textarea defaultValue={data.flashCard.examples[1] || ""}
                              className={"border-2 border-gray-300 h-16 rounded-md"}/>
                    <textarea defaultValue={data.flashCard.examples[2] || ""}
                              className={"border-2 border-gray-300 h-16 rounded-md"}/>
                </div>


            </div>


            <div className={"flex justify-end gap-12 mr-3"}>
                <Button variant="contained" onClick={handleDeletion}
                        className={"bg-red-500 hover:bg-red-600"}> Delete </Button>
                <Button variant="contained" onClick={handleClick}> Confirm </Button>
            </div>
        </div>
    )
}

export default CardUpdate;