import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import MarketPlace from "./pages/MarketPlace";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import BookShelf from "./pages/BookShelf";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/bookshelf" element={<BookShelf/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/MarketPlace" element={<MarketPlace/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </div>
    );
}

export default App;
