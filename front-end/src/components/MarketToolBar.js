function MarketToolBar() {
    return (
        <div className="p-4 bg-gray-400">
            <form className="flex items-center justify-between">
                <span className="mr-2">Sort By:</span>
                <select className="mr-2">
                    <optgroup>
                        <option>Default</option>
                        <option>Most Imported</option>
                        <option>Rating: High to Low</option>
                        <option>Rating: Low to High</option>
                        <option>Upload Date: New to Old</option>
                        <option>Upload Date: Old to New</option>
                    </optgroup>
                </select>
                <span className="mr-2">Must include tags:</span>
                <select className="mr-2">
                    <optgroup>
                        <option>TBD</option>
                    </optgroup>
                </select>
                <input type="search" className="mr-2 p-2 border border-gray-300" />
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Search
                </button>
            </form>
        </div>
    );
}

export default MarketToolBar;
