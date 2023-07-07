import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MarketPlace from "./pages/MarketPlace";
import BookshelfPage from "./pages/BookshelfPage";
import CardLearningPage from "./pages/CardLearningPage";
import DeckDetail from "./components/DeckDetail";
import NavBar from "./components/shared/NavBar";
import EditCard from "./pages/EditCard";
import MyCardAddition from "./components/MyCardAddition";

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className={"mt-14"}>
                <Routes>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/demo" element={<MyCardAddition />}/>
                <Route path="/bookshelf" element={<BookshelfPage />}/>

                <Route path="/cardlearning" element={<CardLearningPage/>}/>
                <Route path="/test_detail" element={<DeckDetail />}/>

                <Route path="/add_card/:deckId" element={<EditCard />}/>
                <Route path="/marketplace" element={<MarketPlace />}/>
            </Routes>
            </div>
        </div>
    );
}

export default App;
