import CardLearning from "../components/CardLearning.jsx";
import {useParams} from "react-router-dom";
import NavBar from "../components/shared/NavBar.jsx";


const CardLearningPage = () => {
    const {id} = useParams();

    return (
        <>
            <NavBar/>
            <div className={"container mx-auto pt-16"}>
                <CardLearning id={id}/>
            </div>
        </>

    );

}
export default CardLearningPage;