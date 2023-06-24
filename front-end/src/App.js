import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Demo from "./pages/Demo";
import MarketPlace from "./pages/MarketPlace";
import BookshelfPage from "./pages/BookshelfPage";
import CardLearning from "./pages/CardLearning";
import DeckDetail from "./components/DeckDetail";
import Card_Addition_Page from "./pages/Card_Addition_Page";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className={"mt-14"}>
                <Routes>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/demo" element={<Demo />}/>
                <Route path="/bookshelf" element={<BookshelfPage />}/>

                <Route path="/cardlearning" element={<CardLearning/>}/>
                <Route path="/test_detail" element={<DeckDetail />}/>

                <Route path="/test_card_addition" element={<Card_Addition_Page />}/>
                <Route path="/marketplace" element={<MarketPlace />}/>
            </Routes>
            </div>
        </div>
    );
}

export default App;
