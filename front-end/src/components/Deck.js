import React, {useEffect, useState} from 'react';
import {PlayIcon} from "@heroicons/react/20/solid";

const Deck = ({deck}) => {
    const learningProgress = Math.round(deck.learnt / deck.total * 100);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
            setTimeout(() => {
                    if (progress < learningProgress) {
                        setProgress(progress + 1);
                    }
                },
                6)
        },
        [progress]);

    return (
        <div className="m-2 bg-white rounded-xl shadow-md md:flex md:hover:shadow-xl md:content-stretch overflow-hidden">
            <img className="object-cover w-full h-60 rounded-t-xl md:w-48 md:rounded-l-xl md:rounded-r-none"
                     src={deck.cover} alt={""}/>
            <div className="px-8 py-4 md:w-64">
                {learningProgress > 0 &&
                    <h3 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {learningProgress}% complete
                    </h3>}
                <h2 className="text-2xl font-bold mt-4">{deck.title}</h2>
                {learningProgress > 0 &&
                    <div className={"space-y-2"}>
                        <div className="bg-gray-200 rounded-full">
                            <div
                                className={`bg-indigo-500 text-xs leading-none py-1 text-center text-white rounded-full`}
                                style={{width: `${progress}%`}}>
                                {progress}%
                            </div>
                        </div>
                        <button className={"bg-emerald-400 rounded-full text-white p-2 hover:ring-2 hover:ring-blue-300 hover:text-pink-300"}><PlayIcon className={"h-6 w-6"}/></button>
                    </div>}
                <div className="flex items-center flex-wrap mt-5 gap-2">
                    {deck.tags.map((tag) => (
                        <div
                            className="bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-1 hover:bg-pink-400">{tag}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deck;
