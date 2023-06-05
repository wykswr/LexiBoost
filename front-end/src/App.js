import Home from "./pages/Home";
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
