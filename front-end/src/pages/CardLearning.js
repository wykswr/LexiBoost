import {useEffect, useState} from "react";
import fakeCards from "../assets/fakeCards.json";

const CardLearning = () => {
    const [timer, setTimer] = useState(180)
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { word, type, pronunciation, example } = fakeCards.cards[currentCardIndex];

    const [showCard, setShowCard] = useState(true);
    
    useEffect(() => {
        // Timer countdown logic
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(countdown); // Cleanup on component unmount
    }, []);

    const handleNextCard = () => {
        if (currentCardIndex === fakeCards.cards.length - 1) {
            setCurrentCardIndex(0);
        } else {
            setCurrentCardIndex((prevIndex) => prevIndex + 1);
        }
        setShowCard(true);
    };

    useEffect(() => {
        setShowCard(true);
    }, [currentCardIndex]);



    return(
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <div className="flex justify-between w-full p-4 bg-white shadow rounded-lg mb-4">
                <div>
                    <span className="font-semibold text-gray-700">Reviewed:</span>{' '}
                    <span className="text-gray-500">{currentCardIndex}/{fakeCards.cards.length}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">New:</span>{' '}
                    <span className="text-gray-500">{fakeCards.cards.length-currentCardIndex}/{fakeCards.cards.length}</span>
                </div>
                <div>
                    <span className="font-semibold text-gray-700">Time:</span>{' '}
                    <span className="text-gray-500">{timer} seconds</span>
                </div>
            </div>

                    <div className="w-full h-80 place-items-stretch rounded-xl shadow-md hover:shadow-xl
        md:w-96 md:h-64 md:grid-cols-2 md:grid-rows-none flex flex-col items-center justify-center">
                        <div>
                            <span className="text-gray-500 center">{word}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">{type}</span>
                        </div>
                        <div>
                            <span className="text-gray-500">{pronunciation}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Example:</span>{' '}
                            <span className="text-gray-500">{example}</span>
                        </div>
                        <button
                            // className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            onClick={handleNextCard}
                        >
                            Next
                        </button>
                    </div>
        </div>
    )

}
export default CardLearning;