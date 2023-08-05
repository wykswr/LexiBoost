import {Button} from "@mui/material";
import useArray from "../hooks/useArray.js";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCardToDeck, deleteFlashCard, editFlashCard} from "../redux/card_creation/thunk";
import {
    useAddFlashCardMutation,
    useDeleteFlashCardMutation,
    useGetSingleFlashCardQuery,
    useUpdateFlashCardMutation
} from "../redux/api/apiSlice.js";

const CardAddition = ({deckId}) => {
    const [addFlashcard, {isAdding}] = useAddFlashCardMutation();

    const defRef = useRef(null);
    const exRef = useRef(null);
    const spellingRef = useRef(null);
    const pronunciationRef = useRef(null);

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

        addFlashcard({deckId, content: newCard});
    }

    return (
        <div className={"grid grid-cols-1 items-stretch gap-10"}>
            <div className={"flex flex-col gap-3"}>
                <label htmlFor='spelling'
                       className="block  text-sm font-medium leading-6 text-gray-900"> Spelling </label>
                <input type='text' required id="spelling"
                       className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"}
                       ref={spellingRef}/>
                <label htmlFor='pronunciation' className={""}> Pronunciation </label>
                <input type='text' id="pronunciation"
                       className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"}
                       ref={pronunciationRef}/>
            </div>

            <div className={"flex flex-col gap-3"}>
                <label htmlFor={"definitions"}>Definitions</label>
                <div className={"flex flex-col gap-3"} ref={defRef}>

                    <textarea className={"border-2 border-gray-300 rounded-md h-16"}/>
                    <textarea className={"border-2 border-gray-300 rounded-md h-16"}/>
                    <textarea className={"border-2 border-gray-300 rounded-md h-16"}/>

                </div>
            </div>

            <div className={"flex flex-col gap-3"}>
                <label htmlFor={"example"}>Example Sentences</label>
                <div className={"flex flex-col gap-3"} ref={exRef}>
                    <textarea className={"border-2 border-gray-300 h-16 rounded-md"}/>
                    <textarea className={"border-2 border-gray-300 h-16 rounded-md"}/>
                    <textarea className={"border-2 border-gray-300 h-16 rounded-md"}/>
                </div>
            </div>


            <div className={"flex justify-end gap-12 mr-3"}>
                <Button variant="contained" onClick={handleClick}> Confirm </Button>
            </div>
        </div>
    )
}

export default CardAddition;