import {Link} from "react-router-dom";


function NavBar() {
    return (
        <nav className={"flex flex-row justify-around"}>
            <div className={"bg-blue-400 rounded"}>
                <Link to="/">Home</Link>
            </div>
            <div className={"bg-green-400 rounded"}>
                <Link to="/bookshelf">BookShelf</Link>
            </div>
            <div className={"bg-pink-500 rounded"}>
                <Link to="/login">Login</Link>
            </div>
            <div className={"bg-pink-500 rounded"}>
                <Link to="/signup">SignUp</Link>
            </div>
            <div className={"bg-red-500 rounded"}>
                <Link to="/MarketPlace"> Market Place </Link>
            </div>
        </nav>
    )
}

export default NavBar;