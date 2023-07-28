import {Button} from "@mui/material";
import useArray from "../hooks/useArray.js";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCardToDeck, deleteFlashCard, editFlashCard} from "../redux/card_creation/thunk";



const CardAddition = ({deckId, cardId}) => {
    const dispatch = useDispatch();
    if (cardId) {// If the code is editing existing cards, the state in reducer file must be updated by fetching from the backend. Otherwise, just use the default value of the initializer

    }
    const {spelling, pronunciation, definition, examples} = useSelector((state) => state.creationForm);
    const [definitions, {push: pushRef, set: setRef}] = useArray(definition);
    const [example, {push: pushEx, set: setEx}] = useArray(examples);
    const defRef = useRef(null);
    const exRef = useRef(null);
    const spellingRef = useRef(null);
    const pronunciationRef = useRef(null);
    const handleDefinitionAddition = () => {
        let defs = [];
        for (let i = 0; i < defRef.current.children.length; i++) {
            defs.push(defRef.current.children[i].value);
        }
        setRef(defs);
        definitions[definitions.length - 1] !== "" && pushRef("");
    }

    const handleExampleAddition = () => {
        let newExample = [];
        for (let i = 0; i < exRef.current.children.length; i++) {
            newExample.push(exRef.current.children[i].value);
        }
        setEx(newExample);
        example[example.length - 1] !== "" && pushEx("");
    }

    const handleDeletion = () => {
        let identifier = {
            cardID: cardId,
            deckID: deckId
        }
        dispatch(deleteFlashCard(identifier));
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
        // console.log(pronunciationRef.current);
        let newCard = {
            spelling: currentSpelling,
            pronunciation: currentPronunciation,
            definition: currentDefs,
            examples: currentExample
        }

        if (cardId) {
            let query = {
                card: newCard,
                deckID: deckId,
                cardID: cardId
            }
            console.log("edit a card");
            dispatch(editFlashCard(query));
        } else {
            newCard.burnt = false;
            newCard.mistakeCount = 0;
            newCard.correctCount = 0;
            let query = {
                card: newCard,
                deckID: deckId
            }
            console.log(query);
            dispatch(addCardToDeck(query));

        }

        // update reducer
        console.log(currentDefs);
        console.log(currentExample);
    }

    return (
        <div className={"grid grid-cols-1 items-stretch gap-10"}>
            <h1 className={"text-xl font-semibold text-indigo-500"}>{cardId}</h1>
            <div className={"flex flex-col gap-3"}>
                <label htmlFor='spelling' className="block  text-sm font-medium leading-6 text-gray-900"> Spelling </label>
                <input type='text' required id="spelling" className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"} ref={spellingRef}/>
                <label htmlFor='pronunciation' className={""}> Pronunciation </label>
                <input type='text' id="pronunciation" className={"px-1 caret-pink-400 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md shadow-sm border-2 border-gray-300 rounded-md h-10"} ref={pronunciationRef}/>
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
                    {example.map((example, index) => (
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