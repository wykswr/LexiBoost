import NavBar from "./components/shared/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import CardAddition from "./components/CardAddition.jsx";
import BookshelfPage from "./pages/BookshelfPage.jsx";
import CardLearningPage from "./pages/CardLearningPage.jsx";
import EditCard from "./pages/EditCard.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";
import ProfileEditingForm from "./components/ProfileEditingForm.jsx";
import UserProfileUpdated from "./pages/UserProfileUpdated.jsx";


function App() {

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<AuthPage/>}/>
                <Route path="/bookshelf" element={<BookshelfPage/>}/>
                <Route path="/learn/:id" element={<CardLearningPage/>}/>
                <Route path="/add_card/:deckId" element={<EditCard/>}/>
                <Route path="/marketplace" element={<MarketPlace/>}/>
                <Route path="/profile" element={<UserProfileUpdated/>}/>
                {/*<Route path="/:userId" element={<UserProfileUpdated ID={'64a70a6e426d71fcc0486ebc'}/>}/>*/}

            </Routes>
        </>
    )
}

export default App
