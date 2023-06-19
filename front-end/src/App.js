import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Demo from "./pages/Demo";
import BookshelfPage from "./pages/BookshelfPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/demo" element={<Demo />}/>
                <Route path="/bookshelf" element={<BookshelfPage />}/>
            </Routes>
        </div>
    );
}

export default App;
