import {useSelector} from "react-redux";
import Tag from "./Tag";

function MarketToolBar() {
    //const dispatch = useDispatch();
    const tagsSelected = useSelector(state => state.MarketToolBarFields.tagsSelected);

    return (
        <div className="flex flex-wrap p-4 bg-indigo-400">
            <form className="items-center justify-between flex flex-wrap md:flex-row gap-4">
                <div>
                    <span className="mr-2">Sort By:</span>
                    <select className="mr-2 rounded-lg">
                        <optgroup>
                            <option>Default</option>
                            <option>Most Imported</option>
                            <option>Rating: High to Low</option>
                            <option>Rating: Low to High</option>
                            <option>Upload Date: New to Old</option>
                            <option>Upload Date: Old to New</option>
                        </optgroup>
                    </select>
                </div>
                <div className="flex flex-wrap md:flex-row content-center">
                    <div className="m-2"> Specify tags: </div>
                    <div className="bg-white border-gray-400 border-2 margin-2 rounded-md gap-1 md:flex flex-wrap">
                        {tagsSelected.map((currentTag) => (
                            <div className="rounded-xl bg-gray-400 m-1">
                                <Tag
                                    key={currentTag.tagID}
                                    tag={currentTag}
                                />
                                <span className="cursor-pointer content-center">&times;</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-80">
                    <input className="py-2 px-4 rounded-l-lg " placeholder="Add a new tag..." type="text"/>
                    <button className="py-2 px-4 m-2 ml-0 rounded-r-lg bg-orange-400 text-white hover:scale-125 transition">
                        Add Tag
                    </button>
                </div>
                <div className="w-full md:w-80">
                    <input className="py-2 px-4 rounded-l-lg" placeholder="Search..." />
                    <button className="px-4 py-2 m-2 ml-0 bg-orange-400 text-white rounded-r-lg hover:scale-125 transition">
                        Search
                    </button>
                </div>

            </form>
        </div>
    );
}

export default MarketToolBar;
