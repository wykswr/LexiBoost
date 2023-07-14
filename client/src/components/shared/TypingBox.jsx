import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const Cursor = () => {
    return (
        <span className={"animate-flicker"}>▌</span>
    );
}

const TypingBox = ({message}) => {
    const [content, setContent] = useState("");
    const [index, setIndex] = useState(0);
    const [cursor, setCursor] = useState(true);

    useEffect(() => {
            setIndex(0);
            setContent("");
            setCursor(true);
        },
        [message]);

    useEffect(() => {
        setTimeout(() => {
            if (index < message.length) {
                setContent(content + message.charAt(index));
                setIndex(index + 1);
            } else {
                setCursor(false);
            }
        }, 50)
    }, [content, index, message]);

    return (
        <div className="rounded-xl text-justify bg-blue-400 text-white p-2">
            <p>{content}{cursor && <Cursor/>}</p>
        </div>
    );
}

TypingBox.propTypes = {
    message: PropTypes.string.isRequired,
}

export default TypingBox;