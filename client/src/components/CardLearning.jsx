import {useEffect, useState} from "react";
import fakeCards from "../assets/fakeCards.json";
import TypingBox from "./shared/TypingBox.jsx";
import {useNavigate} from 'react-router-dom';
import {useGetFlashCardsQuery} from "../redux/api/apiSlice.js";
import {ArrowPathIcon} from "@heroicons/react/20/solid";


const CardLearning = ({id}) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flashcards, setFlashcards] = useState([]);
    const [showHint, setShowHint] = useState(false);
    const [showDefinition, setShowDefinition] = useState(false);
    const navigate = useNavigate();
    const {data, isLoading, error} = useGetFlashCardsQuery(id.id);
    useEffect(() => {
        if (data) {
            setFlashcards(data.flashcards);
        }
    }, [data]);
    // const {word, type, pronunciation, example, definition} = fakeCards.cards[currentCardIndex];
    // useEffect(() => {
    //     // Fetch flashcard data from the backend API
    //     fetchFlashcards()
    //         .then((data) => {
    //             setFlashcards(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching flashcard data:", error);
    //         });
    // }, []);

    const fetchFlashcards = async () => {
        try {
            const response = await fetch(`http://localhost:8000/decks/${id.id}/flashcards`, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to retrieve flashcard data");
            }

            const data = await response.json();
            console.log(data.flashcards);
            return data.flashcards;

        } catch (error) {
            console.log(error);
            throw new Error("Failed to fetch flashcard data from the backend.");
        }
    };

    const updateCorrectCount = async (num) => {
        try {
            const flashCardId = flashcards[currentCardIndex]._id; // Assuming the flashcard object has an '_id' property

            const response = await fetch(
                `http://localhost:8000/decks/${id.id}/flashcards/${flashCardId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        correctCount: flashcards[currentCardIndex].correctCount + num,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update flashcard");
            }

            // Handle the success response or perform any additional actions

        } catch (error) {
            console.error("Error updating flashcard:", error);
        }
    }

    const updateMistakeCount = async (num) => {
        try {
            const flashCardId = flashcards[currentCardIndex]._id; // Assuming the flashcard object has an '_id' property

            const response = await fetch(
                `http://localhost:8000/decks/${id.id}/flashcards/${flashCardId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mistakeCount: flashcards[currentCardIndex].mistakeCount + num,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update flashcard");
            }

            // Handle the success response or perform any additional actions

        } catch (error) {
            console.error("Error updating flashcard:", error);
        }
    }

    const updateBurnCard = async () => {
        try {
            const flashCardId = flashcards[currentCardIndex]._id; // Assuming the flashcard object has an '_id' property

            const response = await fetch(
                `http://localhost:8000/decks/${id.id}/flashcards/${flashCardId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        burnt: true,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update flashcard");
            }

            // Handle the success response or perform any additional actions

        } catch (error) {
            console.error("Error updating flashcard:", error);
        }
    }

    const handleKnowCard = () => {
        if (showHint){
            updateCorrectCount(1);
        }else{
            updateCorrectCount(2);
        }
        handleNextCard();
    }
    const handleDontKnow = () => {
        if (showHint){
            updateMistakeCount(2);
        }
        setShowDefinition(true);
    }
    const handleBurnCard = () => {
        updateBurnCard();
        handleNextCard();
    }
    const handleShowHint = () => {
        updateMistakeCount(1);
        setShowHint(true);
    }
    const handleNextCard = () => {

        setShowDefinition(false);
        setShowHint(false);

        if (currentCardIndex === flashcards.length - 1) {
            // setCurrentCardIndex(0);
            navigate('/bookshelf');
        } else {
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
        }
    };

    if (isLoading) return (
        <div className={"w-96"}>
            <ArrowPathIcon className={"animate-spin w-40 h-40 text-gray-500 mx-auto"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Content is loading...</h1>
        </div>
    );

    if (error) return (
        <div className={"w-96"}>
            <ArrowPathIcon className={"animate-bounce w-40 h-40 text-gray-500 mx-auto"}/>
            <h1 className={"text-gray-500 text-xl font-semibold text-center"}>Something goes wrong!</h1>
        </div>
    );

    if (flashcards.length === 0) {
        return <div>No flashcards available...</div>;
    }

    console.log(flashcards);
    const {spelling, type, pronunciation, examples, definition } =
        flashcards[currentCardIndex];

    return (
        <div className={"w-full h-screen md:w-3/5 md:h-96 mx-auto md:mt-48 md:bg-gray-50"}>
            <div
                className={"w-full h-4/6 rounded-xl shadow-md hover:shadow-xl md:h-96 flex flex-col items-center place-self-center justify-between"}>
                {!showDefinition && <div className={"content-center text-center p-20"}>
                    <div>

                        <span className=" center text-xl text-stone-950">{spelling}</span>
                    </div>
                    <div>
                        <span className="text-gray-500 center uppercase">{type}</span>
                    </div>
                    <div className={"p-5"}>
                        <span className="text-gray-500">{pronunciation}</span>
                    </div>

                    {showHint && <div>
                        <span className="font-semibold text-gray-700">Example:</span>{' '}
                        <TypingBox message={examples[0]}/>
                    </div>}
                </div>}
                {showDefinition && <div className={"content-center text-center p-28"}>
                    <span>{definition}</span>
                </div>

                }
                {!showDefinition &&
                    <div className={"w-full px-28 md:flex-row md:justify-between hidden md:flex"}>
                        <div>
                            <button
                                disabled={showHint}
                                onClick={handleBurnCard}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className={`w-10 h-10 ${showHint || "text-red-400"}`}>
                                    <path fillRule="evenodd"
                                          d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button>
                                {showHint ?
                                    <svg onClick={handleDontKnow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="currentColor" className="w-10 h-10 text-red-400">
                                        <path fillRule="evenodd"
                                              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                              clipRule="evenodd"/>
                                    </svg> :
                                    <svg onClick={handleShowHint} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="currentColor" className="w-10 h-10 text-indigo-500">
                                        <path
                                            d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z"/>
                                        <path fillRule="evenodd"
                                              d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z"
                                              clipRule="evenodd"/>
                                    </svg>
                                }
                            </button>


                        </div>
                        <button
                            // className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            onClick={handleKnowCard}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-10 h-10 text-teal-500">
                                <path
                                    d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z"/>
                            </svg>


                        </button>
                    </div>
                }
                {showDefinition && <button onClick={handleNextCard}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         fill="currentColor" className="w-10 h-10 hidden md:flex">
                        <path fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                              clipRule="evenodd"/>
                    </svg>
                </button>}
            </div>
            {!showDefinition &&
                <div className={"h-40 md:hidden flex flex-col justify-between p-5"}>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                        onClick={handleBurnCard}
                    >
                        I know
                    </button>

                    {!showHint && <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleShowHint}
                    >
                        Hint
                    </button>}
                    {showHint && <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        onClick={handleDontKnow}
                    >
                        Don't Know
                    </button>}

                </div>
            }
            {showDefinition &&
                <div className={"h-40 md:hidden flex flex-col justify-between p-5"}>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleNextCard}
                    >
                        Next
                    </button>

                </div>}
        </div>
    )
}

export default CardLearning;
