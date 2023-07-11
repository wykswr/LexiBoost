import { Popover } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {useState} from "react";
import MyDialog from "./shared/MyDialog.jsx";


const DownMenu = ({ id , className}) => {
    const [selectedOption, setSelectedOption] = useState("blank")
    const [oldSelected, setOldSelected] = useState("blank")

    const onClose = () => {
        setOldSelected(select => selectedOption)
        setSelectedOption(select => "blank");
    };

    const option = selectedOption === "blank" ? oldSelected : selectedOption

    const setOption = () => {
        setOldSelected(select => "blank")
        setSelectedOption(select => "blank")
    }

    return (
        <div className={className}>
            <Popover>
                <Popover.Button >
                    <EllipsisHorizontalIcon className="hidden md:block absolute top-0 right-0 h-7 w-7 m-1 text-gray-600 hover:text-blue-500 cursor-pointer"
                    onClick={onClose}/>
                </Popover.Button>

                <Popover.Panel className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-2 z-10">
                    <div
                        className="py-2 px-4 cursor-pointer hover:bg-blue-100"
                        onClick={() => setSelectedOption("detail")}
                    >
                        Detail
                    </div>
                    <div
                        className="py-2 px-4 cursor-pointer hover:bg-blue-100"
                        onClick={() => setSelectedOption("edit")}
                    >
                        Edit
                    </div>
                    <div
                        className="py-2 px-4 cursor-pointer hover:bg-red-100 text-red-600"
                        onClick={() => setSelectedOption("delete")}
                    >
                        Delete
                    </div>
                </Popover.Panel>
            </Popover>

            <MyDialog id={id} option={option} setOption={setOption}/>
        </div>
    );
};

export default DownMenu;
