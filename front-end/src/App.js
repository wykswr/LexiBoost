import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";

function App() {
    return (
        // <Signup></Signup>
        <div className="App">
            <Routes>
                <Route path="/" element={<AuthPage />}/>
            </Routes>
        </div>
    );
}

export default App;
