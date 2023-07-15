import DeckEditor from "../components/DeckEditor.jsx";
import CardLearningPage from "./CardLearningPage.jsx";
import {Details} from "@mui/icons-material";
import DeckDetail from "../components/DeckDetail.jsx";

const Demo = () => {
    return (
        <div className={"container mx-auto flex flex-col gap-6 justify-center"}>
            <DeckDetail deckId='64a7a129db6f91db17f6c3cb'/>
        </div>

    );
}

export default Demo;