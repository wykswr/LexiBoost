function Tag({ tag }) {
    return (
        <span className="mr-1 mb-1 text-center inline-block px-3 text-sm font-semibold text-white bg-indigo-400 hover:bg-sky-600 rounded-full shadow-sm">
      {tag.tagName}
    </span>
    );
}

export default Tag;
