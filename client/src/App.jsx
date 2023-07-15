import NavBar from "./components/shared/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import CardAddition from "./components/CardAddition.jsx";
import BookshelfPage from "./pages/BookshelfPage.jsx";
import CardLearningPage from "./pages/CardLearningPage.jsx";
import EditCard from "./pages/EditCard.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";
import ProfileEditingForm from "./components/ProfileEditingForm.jsx";
import Demo from "./pages/Demo.jsx";

function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<AuthPage/>}/>
                <Route path="/demo" element={<Demo/>}/>
                <Route path="/bookshelf" element={<BookshelfPage/>}/>
                <Route path="/learn/:id" element={<CardLearningPage/>}/>
                <Route path="/add_card/:deckId" element={<EditCard/>}/>
                <Route path="/marketplace" element={<MarketPlace/>}/>
            </Routes>
        </>
    )
}

export default App
