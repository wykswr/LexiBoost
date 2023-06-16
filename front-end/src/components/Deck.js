import Card from "./Card";
import useProgress from "../hooks/useProgress";
import {CircularProgress, LinearProgress} from "@mui/material";
import {BookOpenIcon, EllipsisHorizontalIcon, PlayIcon} from "@heroicons/react/20/solid";


const Img = ({src}) => {
    return (
        <img
            className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-r-none"
            src={src}
            alt="Cover"
        />
    )
}

const Panel = ({children}) => {
    return (
        <div className="grid grid-cols-3 place-items-stretch md:grid-rows-3 md:grid-cols-none">
            {children}
        </div>
    )
}


const Deck = ({deck}) => {
    let percent = Math.round(deck.learnt / deck.total * 100)
    const [progress] = useProgress(percent)
    return (
        <Card>
            <Img src={deck.cover}/>
            <Panel>
                <div className={"p-1 flex flex-col justify-between md:justify-around relative"}>
                    <EllipsisHorizontalIcon
                        className={"hidden md:block absolute top-0 right-0 h-7 w-7 m-1 text-gray-600 hover:text-blue-500 cursor-pointer"}/>
                    {percent > 0 && (
                        <h3 className="hidden md:block uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {percent}% complete
                        </h3>
                    )}
                    <h2 className="text-2xl font-bold mt-4 text-blue-500 md:text-black">{deck.title}</h2>
                    <div className="md:hidden">{percent > 0 ?
                        <div className={"relative h-16 w-16"}>
                            <CircularProgress variant="determinate" value={progress}
                                              className={"absolute top-0 left-0 w-full h-full text-green-400"}/>
                            <div
                                className="absolute text-green-500 top-0 left-0 w-full h-full flex items-center justify-center text-xl font-bold">
                                75%
                            </div>
                        </div> :
                        <div className={"text-indigo-500 font-semibold text-sm"}>{deck.total} Cards</div>
                    }</div>
                    <div className="hidden md:block">{percent > 0 &&
                        <LinearProgress variant="determinate" value={progress} className={"h-2 rounded-md"}/>}</div>
                </div>

                <div className={"flex flex-col justify-end"}>
                    {percent > 0 ?
                        <>
                            <button
                                className="md:hidden my-3 py-1 bg-green-500 w-full text-xl rounded-md text-white hover:bg-green-800 transform hover::scale-105 transition-transform duration-300">
                                Continue
                            </button>
                            <button
                                className={"hidden md:block h-10 w-10 ml-3 bg-green-500 rounded-full text-white hover:ring-2 ring-blue-300"}>
                                <PlayIcon className={"mx-auto h-8 w-8"}/>
                            </button>
                        </>
                        :
                        <>
                            <button
                                className="md:hidden my-3 py-1 bg-indigo-500 w-full text-xl rounded-md text-white hover:bg-indigo-800 transform hover::scale-105 transition-transform duration-300">
                                Learn
                            </button>
                            <button
                                className={"hidden md:block h-10 w-10 ml-3 bg-indigo-500 rounded-full text-white hover:ring-2 ring-blue-300"}>
                                <BookOpenIcon className={"mx-auto h-8 w-8"}/>
                            </button>
                        </>}
                </div>

                <div className="pt-5 pl-3 flex items-start flex-wrap gap-1 md:pl-2">
                    {deck.tags.map((tag) => (
                        <div
                            key={tag}
                            className="bg-gray-200 rounded-xl px-2 py-0.5 text-sm font-semibold text-gray-700 hover:bg-pink-300"
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </Panel>
        </Card>
    )
}

export default Deck