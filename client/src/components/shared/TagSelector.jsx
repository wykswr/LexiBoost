import {Popover} from "@headlessui/react";
import {ChevronDoubleUpIcon, PlusIcon} from "@heroicons/react/24/outline";
import {XMarkIcon} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import {useGetTagsQuery} from "../../redux/api/apiSlice.js";
import {addTag, removeTag, resetTags, setTags} from "../../redux/tagSelect/reducer.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";


const Tag = ({tag, onClick}) => {
    return (
        <div
            className={"bg-gray-200 rounded-xl pl-2 pr-5 py-0.5 text-sm font-semibold text-gray-700 relative"}>
            <span>{tag}</span>
            <XMarkIcon onClick={onClick}
                       className={"h-5 w-5 ml-0.5 absolute top-0.5 right-0 text-gray-500 hover:text-red-500 cursor-pointer"}/>
        </div>
    );
}

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

const TagSelector = ({defaultTags, className}) => {
    const {data: availableTags, isLoading: tagsPending} = useGetTagsQuery();
    const selectedTags = useSelector((state) => state.tagSelect.selectedTags);
    const dispatch = useDispatch();
    useEffect(() => {
        defaultTags ? dispatch(setTags(defaultTags)) : dispatch(resetTags());
    }, [defaultTags, dispatch]);

    if (tagsPending) return null;

    return (
        <Popover className={className}>
            {({open}) => (
                <>
                    <div className={"flex gap-6 flex-wrap"}>
                        {selectedTags.map((tag) => (
                            <Tag tag={tag} key={tag} onClick={() => dispatch(removeTag(tag))}/>
                        ))}
                        <Popover.Button>{open ?
                            <ChevronDoubleUpIcon
                                className={"p-0.5 h-6 w-6 text-white bg-gray-600 rounded-full"}/> :
                            <PlusIcon
                                className={"p-0.5 h-6 w-6 text-white bg-gray-600 rounded-full hover:animate-spin"}/>
                        }</Popover.Button>
                    </div>


                    <Popover.Panel>
                        <div className={"bg-gray-300 mt-2 rounded-lg p-4 flex gap-6 flex-wrap"}>
                            {availableTags.map((tag) => (
                                <button
                                    disabled={selectedTags.includes(tag)}
                                    onClick={() => dispatch(addTag(tag))}
                                    className={"bg-blue-400 text-white rounded-xl px-2 py-0.5 text-sm font-semibold hover:bg-pink-300 disabled:bg-gray-400 disabled:cursor-not-allowed"}
                                    key={tag}>
                                    {tag}
                                </button>))}
                        </div>
                    </Popover.Panel>
                </>
            )}
        </Popover>
    );
}

TagSelector.propTypes = {
    defaultTags: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string
}


export default TagSelector;