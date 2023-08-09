import {useRef} from "react";
import PropTypes from "prop-types";
import {ArrowPathIcon, CheckIcon} from "@heroicons/react/24/outline/index.js";
import {useEditDeckMutation, useGetDeckQuery} from "../../redux/api/apiSlice.js";
import {Link} from "react-router-dom";
import TagSelector from "./TagSelector.jsx";
import {PencilSquareIcon} from "@heroicons/react/24/solid"
import VisibilityToggle from "./VisibilityToggle.jsx";
import {usePublishDeckMutation, useRetractDeckMutation} from "../../redux/api/apiSlice.js";
import {useSelector} from "react-redux";

const DeckEdit = ({id}) => {
    const {data, isLoading, error} = useGetDeckQuery(id);
    const [updateDeck, {
        isLoading: updateLoading,
        isSuccess: updateSuccess,
        error: updateError
    }] = useEditDeckMutation();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const coverImageRef = useRef();
    const [publishDeck] = usePublishDeckMutation();
    const [retractDeck] = useRetractDeckMutation();
    const selectedTags = useSelector((state) => state.tagSelect.selectedTags);

    const handleSubmit = () => {
        const content = {};
        if (nameRef.current.value !== data.deck.name && nameRef.current.value.trim() !== "") {
            content.name = nameRef.current.value;
        }
        if (descriptionRef.current.value !== data.deck.description && descriptionRef.current.value.trim() !== "") {
            content.description = descriptionRef.current.value;
        }
        if (coverImageRef.current.value !== data.deck.cover && coverImageRef.current.value.trim() !== "") {
            content.cover = coverImageRef.current.value;
        }
        if (selectedTags.length !== 0) { content.tags = selectedTags; }
        updateDeck({id, content});
    }

    const handleReset = () => {
        nameRef.current.value = data.deck.name;
        descriptionRef.current.value = data.deck.description;
        coverImageRef.current.value = data.deck.cover;
    }

    if (updateSuccess) return (
        <div className={"w-96 border border-blue-400 rounded-lg p-1.5 bg-white"}>
            <CheckIcon className={"animate-pulse w-40 h-40 mx-auto text-teal-500"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Content changed</h1>
        </div>
    );

    if (isLoading || updateLoading) return (
        <div className={"w-96"}>
            <ArrowPathIcon className={"animate-spin w-40 h-40 text-gray-500 mx-auto"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Content is loading...</h1>
        </div>
    );

    if (error || updateError) return (
        <div className={"w-96"}>
            <ArrowPathIcon className={"animate-bounce w-40 h-40 text-gray-500 mx-auto"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Something goes wrong!</h1>
        </div>
    );

    const setEnabled = () => {
        if (data.deck.isPublic) {
            retractDeck(id);
        } else {
            publishDeck(id);
        }
    }


    return (
        <div className={"w-96 border border-blue-400 rounded-lg p-1.5 bg-white flex flex-col gap-10"}>
            <div className={"flex flex-col mt-10"}>
                <label htmlFor="title" className={"text-lg font-light indent-1"}>Name</label>
                <input type="text" id="title" className={"border border-gray-500 p-1 rounded caret-pink-500"}
                       ref={nameRef}
                       defaultValue={data.deck.name}
                />
            </div>
            <div>
                <h2 className={"text-lg font-light indent-1 mb-1"}>Tags</h2>
                <TagSelector defaultTags={data.deck.tags}/>
            </div>

            <div className={"flex flex-col"}>
                <label htmlFor="synopsis" className={"text-lg font-light indent-1"}>Description</label>
                <textarea id="synopsis" rows={4} className={"border border-gray-500 p-1 rounded caret-pink-500"}
                          defaultValue={data.deck.description}
                          ref={descriptionRef}/>
            </div>
            <div className={"flex-col hidden"}>
                <label htmlFor="coverImage" className={"text-lg font-light indent-1"}>Cover Image</label>
                <input type="text" id="coverImage" className={"border border-gray-500 p-1 rounded caret-pink-500"}
                       defaultValue={data.deck.cover}
                       ref={coverImageRef}/>
            </div>
            <div>
                <h2 className={"text-lg font-light indent-1"}>Flash Cards</h2>
                <p className={"flex items-center gap-9 text-gray-500 indent-1"}><span>{data.deck.flashCards.length} cards</span>
                    <Link to={`/add_card/${id}`} className={"hover:text-indigo-500"}><PencilSquareIcon
                        className={"w-6 h-6"}/></Link>
                </p>

            </div>
            <div>
                <h2 className={"text-lg font-light indent-1"}>Public</h2>
                <VisibilityToggle setEnabled={setEnabled} enabled={data.deck.isPublic}/>
            </div>

            <div className={"flex justify-end gap-6 mx-3"}>
                <button
                    onClick={handleReset}
                    className={"bg-emerald-600 w-1/4 text-white text-lg rounded-lg px-1.5 py-0.5 hover:bg-emerald-700"}>Reset
                </button>
                <button
                    onClick={handleSubmit}
                    className={"bg-indigo-500 w-1/4 text-white text-lg rounded-lg px-1.5 py-0.5 hover:bg-indigo-600"}>Save
                </button>
            </div>
        </div>
    );
}

DeckEdit.propTypes = {
    id: PropTypes.string.isRequired,
}

export default DeckEdit