function MarketToolBar() {
    return (<div>
        <form>
            <span> Sort By: </span>
            <select>
                <optgroup>
                    <option> Default </option>
                    <option> Most Imported </option>
                    <option> Rating: High to Low </option>
                    <option> Rating: Low to High </option>
                    <option> Upload Date: New to Old </option>
                    <option> Upload Date: Old to New</option>
                </optgroup>
            </select>
            <span> Must include tags: </span>
            <select>
                <optgroup>
                    <option> TBD </option>
                </optgroup>
            </select>
            <input type="search"></input>
            <button> Search </button>
        </form>
    </div>);
}

export default MarketToolBar;