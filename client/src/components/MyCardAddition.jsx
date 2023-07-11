import {Button, TextField} from "@mui/material";
import useArray from "../hooks-decrepit/useArray.js";
import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {useRef} from "react";



const MyCardAddition = ({deckId, cardId}) => {
    // useDispatch
    // useSelector
    const [definitions, {push: pushRef, set: setRef}] = useArray(["A", "B", "C"]);
    const [examples, {push: pushEx, set: setEx}] = useArray(["1", "2", "3"]);
    const defRef = useRef(null);
    const exRef = useRef(null);

    const handleDefinitionAddition = () => {
        let defs = [];
        for (let i = 0; i < defRef.current.children.length; i++) {
            defs.push(defRef.current.children[i].value);
        }
        setRef(defs);
        definitions[definitions.length - 1] !== "" && pushRef("");
    }

    const handleExampleAddition = () => {
        let newExamples = [];
        for (let i = 0; i < exRef.current.children.length; i++) {
            newExamples.push(exRef.current.children[i].value);
        }
        setEx(newExamples);
        examples[examples.length - 1] !== "" && pushEx("");
    }

    const handleClick = () => {
        let currentDefs = [];
        for (let i = 0; i < defRef.current.children.length; i++) {
            currentDefs.push(defRef.current.children[i].value);
        }
        currentDefs = currentDefs.filter(def => def.trim() !== "");
        let currentExamples = [];
        for (let i = 0; i < exRef.current.children.length; i++) {
            currentExamples.push(exRef.current.children[i].value);
        }

        currentExamples = currentExamples.filter(ex => ex.trim() !== "");

        // update reducer
        console.log(currentDefs);
        console.log(currentExamples)
    }

    return (
        <div className={"grid grid-cols-1 items-stretch gap-10"}>
            <h1 className={"text-xl font-semibold text-indigo-500"}>{cardId}</h1>
            <TextField required id="outlined-required" label="Spelling"/>
            <TextField id="outlined-required" label="Pronunciation"/>

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
                <label htmlFor={"examples"}>Example Sentences</label>
                <div className={"flex flex-col gap-3"} ref={exRef}>
                    {examples.map((example, index) => (
                        index ?
                            <textarea key={index} defaultValue={example}
                                   className={"border-2 border-gray-300 h-16 rounded-md"}/> :
                            <textarea key={index} defaultValue={example} id="examples"
                                   className={"border-2 border-gray-300 h-16 rounded-md"}/>
                    ))}
                </div>
                <button><PlusCircleIcon className={"w-8 h-8 hover:text-indigo-500"} onClick={handleExampleAddition}/></button>

            </div>


            <div className={"flex justify-end gap-12 mr-3"}>
                <Button variant="contained" className={"bg-red-500 hover:bg-red-600"}> Delete </Button>
                <Button variant="contained" onClick={handleClick}> Confirm </Button>
            </div>

        </div>

    )


}

export default MyCardAddition;