import React, {useEffect, useState} from 'react';
import {PlayIcon} from '@heroicons/react/20/solid';
import {getRandomColor} from "../utils/colors";

const Deck = ({deck}) => {
    const learningProgress = Math.round((deck.learnt / deck.total) * 100);
    const [progress, setProgress] = useState(0);
    const [color] = useState(getRandomColor())

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < learningProgress) {
                setProgress(progress + 1);
            }
        }, 10);

        return () => {
            clearInterval(timer);
        };
    }, [progress, learningProgress]);

    return (
        <div className="bg-white rounded-xl shadow-md md:flex-1 md:hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img
                className="object-cover w-full h-60 rounded-t-xl md:rounded-l-xl md:rounded-r-none"
                src={deck.cover}
                alt="Cover"
            />
            <div className="flex flex-col justify-between md:w-64 p-4 md:p-6">
                {learningProgress > 0 && (
                    <h3 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {learningProgress}% complete
                    </h3>
                )}
                <div className="">
                    <h2 className="text-xl md:text-2xl font-bold mt-4">{deck.title}</h2>
                    {learningProgress > 0 && (
                        <div className="w-full space-y-2 mt-4">
                            <div className={`h-2 bg-gray-200 rounded-full overflow-hidden`}>
                                <div
                                    className="h-full bg-indigo-500 transition-all duration-500"
                                    style={{width: `${progress}%`}}
                                />
                            </div>
                            <button className={`${color} rounded-full text-white p-2 hover:bg-indigo-800 transform hover:scale-105 transition-transform duration-300`}>
                                <PlayIcon className="h-6 w-6"/>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-center flex-wrap mt-5 space-x-2">
                    {deck.tags.map((tag) => (
                        <div
                            key={tag}
                            className={`rounded-full px-3 py-1 text-xs font-semi-bold text-black hover:bg-gray-300 ${color}`}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deck;
