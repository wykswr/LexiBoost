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


const CardAddition = ({deckId, cardId}) => {
    if (cardId) {
        const [data, isLoading, isError] = useGetSingleFlashCardQuery(deckId, cardId);
        if (isLoading) return <div>Loading...</div>
        if (isError) return <div>Error</div>
    }

    const [deleteCard, {isDeleting}] = useDeleteFlashCardMutation();
    const [updateCard, {isUpdating}] = useUpdateFlashCardMutation();
    const [addCard, {isAdding}] = useAddFlashCardMutation();

    const [definitions, setDefinitions] = useState(cardId ? data.definition : []);
    const [examples, setExamples] = useState(cardId ? data.examples : []);

    const defRef = useRef(null);
    const exRef = useRef(null);
    const spellingRef = useRef(null);
    const pronunciationRef = useRef(null);


    const handleDefinitionAddition = () => {
        let defs = [];
        for (let i = 0; i < defRef.current.children.length; i++) {
            defs.push(defRef.current.children[i].value);
        }
        if (definitions[definitions.length - 1] !== "") {
            defs.push("");
        }
        setDefinitions(defs);
    }

    const handleExampleAddition = () => {
        let newExamples = [];
        for (let i = 0; i < exRef.current.children.length; i++) {
            newExamples.push(exRef.current.children[i].value);
        }
        if (newExamples[newExamples.length - 1] !== "") {
            newExamples.push("");
        }
        setExamples(newExamples);
    }

    const handleDeletion = () => {
        if (cardId) {
            deleteCard(cardId, deckId);
        }
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

        if (cardId) {
            // let query = {
            //     card: newCard,
            //     deckID: deckId,
            //     cardID: cardId
            // }
            // console.log("edit a card");
            // dispatch(editFlashCard(query));
            updateCard(deckId, cardId, newCard);
        } else {
            newCard.burnt = false;
            newCard.mistakeCount = 0;
            newCard.correctCount = 0;
            // let query = {
            //     card: newCard,
            //     deckID: deckId
            // }
            // console.log(query);
            // dispatch(addCardToDeck(query));
            addCard(deckId, newCard);

        }
    }

    return (
        <div className={"grid grid-cols-1 items-stretch gap-10"}>
            <h1 className={"text-xl font-semibold text-indigo-500"}>{cardId}</h1>
            <div className={"flex flex-col gap-3"}>
                <label htmlFor='spelling' className="block  text-sm font-medium leading-6 text-gray-900"> Spelling </label>
                <input type='text' required id="spelling" className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"} ref={spellingRef}/>
                <label htmlFor='pronunciation' className={""}> Pronunciation </label>
                <input type='text' id="pronunciation" defaultValue={cardId ? data.pronunciaton : ""} className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"} ref={pronunciationRef}/>
            </div>

            <div className={"flex flex-col gap-3"}>
                <label htmlFor={"definitions"}>Definitions</label>
                <div className={"flex flex-col gap-3"} ref={defRef}>
                    {definitions.map((definition, index) => (
                        index ?
                            <textarea key={index} defaultValue={definition}
                                      className={"border-2 border-gray-300 rounded-md h-16"}/> :
                            <textarea key={index} defaultValue={definition} id="definitions"
                                      className={"border-2 border-gray-300 rounded-md h-16"}/>
                    ))}
                </div>
                <button><PlusCircleIcon className={"w-8 h-8 hover:text-indigo-500"} onClick={handleDefinitionAddition}/></button>

            </div>

            <div className={"flex flex-col gap-3"}>
                <label htmlFor={"example"}>Example Sentences</label>
                <div className={"flex flex-col gap-3"} ref={exRef}>
                    {examples.map((example, index) => (
                        index ?
                            <textarea key={index} defaultValue={example}
                                      className={"border-2 border-gray-300 h-16 rounded-md"}/> :
                            <textarea key={index} defaultValue={example} id="example"
                                      className={"border-2 border-gray-300 h-16 rounded-md"}/>
                    ))}
                </div>
                <button><PlusCircleIcon className={"w-8 h-8 hover:text-indigo-500"} onClick={handleExampleAddition}/></button>

            </div>


            <div className={"flex justify-end gap-12 mr-3"}>
                <Button variant="contained" onClick={handleDeletion} className={"bg-red-500 hover:bg-red-600"}> Delete </Button>
                <Button variant="contained" onClick={handleClick}> Confirm </Button>
            </div>
        </div>
    )
}

export default CardAddition;