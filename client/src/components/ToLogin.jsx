import {Link} from "react-router-dom";

const ToLogin = () => {
    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 grid place-items-center z-50 backdrop-blur">
            <div className={"w-96 grid place-items-center gap-6"}>
                <h2 className="text-3xl font-semibold text-black-800 text-center">Please login to continue</h2>
                <Link to={"/"}
                    className={"bg-indigo-500 w-1/4 text-white text-lg rounded-lg px-1.5 py-0.5 hover:bg-indigo-600 mx-auto text-center"}>Login
                </Link>
            </div>
        </div>
    );
}

export default ToLogin;