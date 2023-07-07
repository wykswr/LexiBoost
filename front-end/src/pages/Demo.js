import DeckEditor from "../components/DeckEditor";
import CardLearningPage from "./CardLearningPage";
import UserProfileUpdated from "./UserProfileUpdated";
import MyCardAddition from "../components/MyCardAddition";

const Demo = () => {
    return (
        <div className={"container mx-auto flex flex-col gap-6 justify-center"}>
            <MyCardAddition />
        </div>

    );
}

export default Demo;