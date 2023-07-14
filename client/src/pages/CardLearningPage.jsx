import {useEffect, useState} from "react";
import fakeCards from "../assets/fakeCards.json";
import CardLearning from "../components/CardLearning.jsx";
import {useParams} from "react-router-dom";


const CardLearningPage = () => {
    const id = useParams();

    return(
        <div className={"container mx-auto mt-8"}>
            <CardLearning id={id}/>
        </div>

    );

}
export default CardLearningPage;