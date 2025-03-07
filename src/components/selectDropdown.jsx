import { useContext } from "react";
import UserContext from "./UserContext";
const SelectDropdown = ({ onChange }) => {
    const { todo, setTodo, todos, setTodos, priority, setPriority } = useContext(UserContext);
    return (
        <div className="flex justify-center">
            <div className="my-3 xl:w-96">
                <select
                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-white bg-gray-900 bg-clip-padding bg-no-repeat border border-solid border-gray-600 rounded transition ease-in-out m-0 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    aria-label="Default select example"
                    value={priority}
                    onChange={(e) => { onChange(e) }}
                >
                    <option className="bg-gray-900 text-white" defaultValue>Select priority</option>
                    <option className="bg-gray-900 text-white" value="High">High</option>
                    <option className="bg-gray-900 text-white" value="Medium">Medium</option>
                    <option className="bg-gray-900 text-white" value="Low">Low</option>
                </select>
            </div>
        </div>
    );
};

export default SelectDropdown;
