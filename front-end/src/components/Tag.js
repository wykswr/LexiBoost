const Tag = ({ tagName }) => {
    return (
        <li className="inline-block bg-gray-200 rounded-xl px-2 py-0.5 text-sm font-semibold text-gray-700 hover:bg-pink-300 mr-2 mb-2">
            {tagName}
        </li>
    );
};

export default Tag;
