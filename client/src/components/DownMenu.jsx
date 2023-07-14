import {Menu} from '@headlessui/react'
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid/index.js";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {setSelected} from "../redux/dialog/reducer.js";

const DownMenu = ({id}) => {
    const dispatch = useDispatch()
    const handleClick = (e) => {
        dispatch(setSelected({id, selected: e.target.textContent}))
    }

    return (
        <>
            <Menu>
                <Menu.Button>
                    <EllipsisHorizontalIcon
                        className={"h-8 w-8 text-gray-500 hover:text-indigo-500 absolute top-0 right-0"}/>
                </Menu.Button>
                <Menu.Items className={"flex flex-col m-1 rounded bg-gray-100 shadow overflow-hidden text-blue-500 gap-1"}>
                    <Menu.Item>
                        {({active}) => (
                            <button className={`p-1 text-start ${active && 'bg-blue-500 text-white'}`} onClick={handleClick}>
                                Detail
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button className={`p-1 text-start ${active && 'bg-blue-500 text-white'}`} onClick={handleClick}>
                                Edit
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button className={`p-1 text-red-500 text-start ${active && 'bg-red-500 text-white'}`} onClick={handleClick}>
                                Delete
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </>
    )
}

DownMenu.propTypes = {
    id: PropTypes.string.isRequired
}

export default DownMenu
