const Card = ({children}) => {
    return (
        <div className="w-full h-80 grid grid-rows-2 place-items-stretch rounded-xl shadow-md hover:shadow-xl
        md:w-96 md:h-64 md:grid-cols-2 md:grid-rows-none">{children}</div>
    )
}

export default Card