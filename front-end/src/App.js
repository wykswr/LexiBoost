import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Demo from "./pages/Demo";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AuthPage />}/>
                <Route path="/home" element={<HomePage />}/>
                <Route path="/demo" element={<Demo />}/>
            </Routes>
        </div>
    );
}

export default App;
