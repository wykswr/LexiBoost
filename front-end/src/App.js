import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Demo from "./pages/Demo";
import BookshelfPage from "./pages/BookshelfPage";
import CardLearning from "./pages/CardLearning";
import Card_Addition_Page from "./pages/Card_Addition_Page";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/demo" element={<Demo />}/>
                <Route path="/bookshelf" element={<BookshelfPage />}/>
                <Route path="/cardlearning" element={<CardLearning/>}/>
                <Route path="/test_card_addition" element={<Card_Addition_Page />}/>
            </Routes>
        </div>
    );
}

export default App;
