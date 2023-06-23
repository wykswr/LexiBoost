import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Demo from "./pages/Demo";
import BookshelfPage from "./pages/BookshelfPage";
import DeckDetail from "./components/DeckDetail";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/demo" element={<Demo />}/>
                <Route path="/bookshelf" element={<BookshelfPage />}/>
                <Route path="/test_detail" element={<DeckDetail />}/>

            </Routes>
        </div>
    );
}

export default App;
