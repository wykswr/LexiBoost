function Tag({ tag }) {
    return (
        <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold bg-blue-500 text-white rounded-full shadow-md">
      {tag.tagName}
    </span>
    );
}

export default Tag;
