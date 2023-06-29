import {useEffect, useState} from "react";
import fakeCards from "../assets/fakeCards.json";
import CardLearning from "../components/CardLearning";


const CardLearningPage = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const { word, type, pronunciation, example } = fakeCards.cards[currentCardIndex];

    const [showCard, setShowCard] = useState(true);

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
        <CardLearning/>
    )

}
export default CardLearningPage;