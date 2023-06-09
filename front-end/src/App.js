import Home from "./pages/Home";
import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import MarketPlace from "./pages/MarketPlace";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/MarketPlace" element={<MarketPlace/>}/>
            </Routes>
        </div>
    );
}

export default App;
