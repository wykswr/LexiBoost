import {useRef} from "react";
import {ArrowPathIcon, CheckIcon, CpuChipIcon} from "@heroicons/react/24/outline/index.js";
import TagSelector from "./TagSelector.jsx";
import {useAddDeckMutation, useAddDeckAIMutation} from "../../redux/api/apiSlice.js";
import {BeakerIcon} from "@heroicons/react/20/solid/index.js";


const DeckCreate = () => {
    const [createDeck, {
        isLoading,
        isSuccess,
        error
    }] = useAddDeckMutation();
    const [createDeckAI, {
        isLoading: isLoadingAI,
        isSuccess: isSuccessAI,
        error: errorAI
    }] = useAddDeckAIMutation();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const coverImageRef = useRef();
    const tagsRef = useRef();

    const getContent = () => {
        const content = {};
        if (nameRef.current.value.trim() !== "") {
            content.name = nameRef.current.value;
        }
        if (descriptionRef.current.value.trim() !== "") {
            content.description = descriptionRef.current.value;
        }
        if (coverImageRef.current.value.trim() !== "") {
            content.cover = coverImageRef.current.value;
        } else {
            const randID = Math.floor(Math.random() * 5) * 100 + 100;
            content.cover = `https://picsum.photos/${randID}`;
        }
        let tags = tagsRef.current.children;
        let tagsList = [];
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].type !== "button") {
                tagsList.push(tags[i].children[0].innerText);
            }
        }
        if (tagsList.length !== 0) { content.tags = tagsList; }
        content.flashCards = [];
        return content;
    }

    const handleSubmit = () => {
        createDeck(getContent());
    }

    const handleSubmitAI = () => {
        createDeckAI(getContent());
    }

    if (isSuccess || isSuccessAI) return (
        <div className={"w-96 border border-blue-400 rounded-lg p-1.5 bg-white grid place-items-center gap-6 mx-auto"}>
            <CheckIcon className={"animate-pulse w-40 h-40 text-teal-500"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Content changed</h1>
        </div>
    );

    if (isLoading) return (
        <div className={"w-96 grid place-items-center gap-6 mx-auto"}>
            <ArrowPathIcon className={"animate-spin w-40 h-40 text-gray-500"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Content is loading...</h1>
        </div>
    );

     if (isLoadingAI) return (
        <div className={"w-96 grid place-items-center gap-6 mx-auto"}>
            <CpuChipIcon className={"animate-bounce w-40 h-40 text-purple-400"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>AI is generating...</h1>
        </div>
    );

    if (error || errorAI) return (
        <div className={"w-96 grid place-items-center gap-6 mx-auto"}>
            <ArrowPathIcon className={"animate-bounce w-40 h-40 text-gray-500"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Something is wrong!</h1>
        </div>
    );


    return (
        <div className={"w-96 border border-blue-400 rounded-lg p-1.5 bg-white flex flex-col gap-10 mx-auto"}>
            <div className={"flex flex-col"}>
                <label htmlFor="title" className={"text-lg font-light indent-1"}>Name</label>
                <input type="text" id="title" className={"border border-gray-500 p-1 rounded caret-pink-500"}
                       ref={nameRef}
                />
            </div>
            <div>
                <h2 className={"text-lg font-light indent-1 mb-1"}>Tags</h2>
                <TagSelector ref={tagsRef}/>
            </div>

            <div className={"flex flex-col"}>
                <label htmlFor="synopsis" className={"text-lg font-light indent-1"}>Description</label>
                <textarea id="synopsis" rows={4} className={"border border-gray-500 p-1 rounded caret-pink-500"}
                          ref={descriptionRef}/>
            </div>
            <div className={"flex flex-col"}>
                <label htmlFor="coverImage" className={"text-lg font-light indent-1"}>Cover Image</label>
                <input type="text" id="coverImage" className={"border border-gray-500 p-1 rounded caret-pink-500"}
                       ref={coverImageRef}/>
            </div>
            <div className={"flex justify-end gap-6 mx-3"}>
                <button
                    onClick={handleSubmit}
                    className={"bg-indigo-500 w-1/2 text-white text-lg rounded-lg px-1.5 py-0.5 hover:bg-indigo-600"}>
                    Create
                </button>
                <button
                    onClick={handleSubmitAI}
                    className={"bg-pink-500 w-1/2 text-white text-lg rounded-lg px-1.5 py-0.5 hover:bg-pink-600 relative group"}>
                    AI Generate
                    <BeakerIcon className={"absolute right-0 top-1 w-6 h-6 text-white p-0.5 group-hover:animate-pulse"}/>
                </button>
            </div>
        </div>
    );
}

export default DeckCreate