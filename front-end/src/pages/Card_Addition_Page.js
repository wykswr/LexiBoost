import {useDispatch, useSelector} from "react-redux";
import {modifyInputField} from "../redux/card_creation/reducer";


const Card_Addition_Page = () => {
    const dispatch = useDispatch();
    const { spelling, type, pronunciation, hint, definition } = useSelector(state => state.creationForm);

    const handleFieldChange = (e) => {
        const specification = {
            field: e.target.name,
            value: e.target.value,
        }
        dispatch(modifyInputField(specification));
    }

    return (<div>
        <form>
            <h2> Front side </h2>
            <label htmlFor='spelling' > Word </label>
            <input name='spelling' type='text' value={spelling} onChange={handleFieldChange}/>

            <label htmlFor='type'> Type of the word (Optional) </label>
            <input name='type' type='text' value={type} onChange={handleFieldChange}/>

            <label htmlFor='pronunciation'> Pronunciation (Optional) </label>
            <input name='pronunciation' type='text' value={pronunciation} onChange={handleFieldChange}/>


        </form>
        <form>
            <h2> Back side </h2>

            <label htmlFor='hint'> Add a hint for the word (Optional) </label>
            <textarea name='hint' value={hint} onChange={handleFieldChange}/>

            <label htmlFor='definition'>  </label>
            <textarea name='definition' value={definition} onChange={handleFieldChange}/>
        </form>
        <div>
            <button> Cancel </button>
            <button> Create </button>
        </div>

    </div>);

}

export default Card_Addition_Page;