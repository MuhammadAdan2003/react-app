import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import Modal from "./modal"

const Single = () => {
    const {
        setTodo,
        todos,
        setTodos,
        setPriority,
        setdes,
        setIsModalOpen,
        editID,
        seteditID,
        setmatched,
        check,
        filteredTodos,
        setFilteredTodos,
        statusTask,
        local,
        setLocal,
        Completed,
        setCompleted } = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(local));
    }, [local]);

    useEffect(() => {
        const handleStorageChange = () => {
            setLocal(JSON.parse(localStorage.getItem("todos")) || []);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleDelete = (id) => {
        const updatedTodos = todos.filter((item) => item.id !== id);
        setTodos(updatedTodos);
        setLocal(updatedTodos);

        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        window.dispatchEvent(new Event("storage"));
    };

    const handleEdit = (e) => {
        seteditID(editID + 1)
        setmatched(e.target.id)
    }

    useEffect(() => {
        let filtered = local;

        if (check !== "" && check !== "All") {
            filtered = filtered.filter(item => item.priority === check);
        }

        if (statusTask !== "" && statusTask !== "All") {
            filtered = filtered.filter(item =>
                statusTask === "Completed" ? item.isCompleted : !item.isCompleted
            );
        }

        setFilteredTodos(filtered.length > 0 ? filtered : []);
    }, [statusTask, check, local]);

    const Taskstatus = (e) => {
        setCompleted(false)
        const updatedTodos = filteredTodos.map(item =>
            item.id === e.target.id ? { ...item, isCompleted: !item.isCompleted } : item
        );

        setFilteredTodos(updatedTodos);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className={`${filteredTodos.length > 0 ? "grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 w-full gap-6 p-6 bg-gray-900 h-1/2" : "w-full gap-6 p-6"}`}>
            {filteredTodos.length > 0 ? (
                filteredTodos.slice().reverse().map((item) => (
                    <div
                        key={item.id}
                        className="w-full flex flex-col justify-between max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        <div>
                            <div className="flex justify-between items-center">
                                {/* <p className="text-sm text-red-500">This task is now overdue.</p> */}
                                <h2 className="text-xl font-semibold mb-2 text-gray-100">
                                    {item.todo}
                                </h2>
                                <span
                                    className={`inline-block text-[10px] text-white text-xs font-[10px] px-3 py-1 rounded-full mb-4
                                            ${item.priority === "Low" ? "bg-green-500" :
                                            item.priority === "Medium" ? "bg-yellow-500" :
                                                "bg-red-500"}`}
                                >
                                    {item.priority} Priority
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">
                                {item.description !== "" ? item.description : "No description has been added"}
                            </p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                id={item.id}
                                onClick={(e) => {
                                    setIsModalOpen(true)
                                    setTodo(item.todo)
                                    setPriority(item.priority)
                                    setdes(item.description)
                                    handleEdit(e)
                                }}
                                className="bg-blue-500 text-sm text-white cursor-pointer px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 text-sm text-white cursor-pointer px-4  rounded-lg hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                        <p className="mt-5 flex gap-2 items-center"><input onChange={(e) => { Taskstatus(e) }} checked={item.isCompleted} id={item.id} className="h-5 w-5" type="checkbox" /><span className={`text-[12px] text-white text-xs font-[10px] px-3 py-1 rounded-full
                            ${item.isCompleted ? "bg-[#00c95187]" : "bg-[#ff0523bf]"}`}>{item.isCompleted ? "Completed" : "Incompleted"}</span></p>
                        <p className="mt-4">Due Date: {item.date}</p>
                    </div>
                ))
            ) : (
                <p className="col-span-3 text-center text-gray-400 text-lg">
                    {check !== "" ? `No todos available for ${check} priority` : "No todos available"}
                </p>
            )}
            <Modal />
        </div>

    );
};

export default Single;