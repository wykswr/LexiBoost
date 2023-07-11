import NavBar from "./components/shared/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import MyCardAddition from "./components/MyCardAddition.jsx";
import BookshelfPage from "./pages/BookshelfPage.jsx";
import CardLearningPage from "./pages/CardLearningPage.jsx";
import DeckDetail from "./components/DeckDetail.jsx";
import EditCard from "./pages/EditCard.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";

function App() {

    return (
        <>
            <NavBar/>
            <div className={"mt-14"}>
                <Routes>
                    <Route path="/" element={<AuthPage/>}/>
                    <Route path="/demo" element={<MyCardAddition/>}/>
                    <Route path="/bookshelf" element={<BookshelfPage/>}/>

                    <Route path="/cardlearning" element={<CardLearningPage/>}/>
                    <Route path="/test_detail" element={<DeckDetail/>}/>

                    <Route path="/add_card/:deckId" element={<EditCard/>}/>
                    <Route path="/marketplace" element={<MarketPlace/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
