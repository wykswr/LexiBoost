import {PlusCircleIcon} from "@heroicons/react/24/outline";
import {Button} from "@mui/material";

const CardAdditionUpdate = ({deckId, cardId}) => {
    let cardPlaceHolder = {
        spelling: "",
        pronunciation: "",
        definition: [""],
        examples: [""]
    }
    if (cardId) {

    } else {

    }
    return (<div>
        <input className={"bg-gray-200"} type='text' place="hood"/>
    </div>)

}

export default CardAdditionUpdate;