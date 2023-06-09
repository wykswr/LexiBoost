import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import BookShelf from "./pages/BookShelf";


function App() {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/bookshelf" element={<BookShelf/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </div>
    );
}

export default App;
