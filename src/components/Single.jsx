import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import Modal from "./modal"
const Single = () => {
    const [local, setLocal] = useState(() => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    });

    const { todo, setTodo, todos, setTodos, priority, setPriority, des, setdes, isModalOpen, setIsModalOpen, isOpen, setIsOpen, editID, seteditID, matched, setmatched, check, setcheck } = useContext(UserContext);

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
        const deleted = local.filter((item) => item.id !== id);
        setLocal(deleted);
    };

    const handleEdit = (e) => {
        let editedValue = local.filter(item => item.id !== e.target.id)
        setLocal([...editedValue])
        seteditID(editID + 1)
        setmatched(e.target.id)
    }

    useEffect(() => {
        const sorted = local.filter(item => item.priority === check)
        console.log(sorted);
    }, [check])

    return (
        <div className={`${local.length > 0 ? "grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 w-full gap-6 p-6 bg-gray-900 h-1/2" : "w-full gap-6 p-6"}`}>
            {local.length > 0 ? (
                local.map((item) => (
                    <div
                        key={item.id}
                        className="w-full flex flex-col justify-between max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition duration-300"
                    >
                        <div>
                            <div className="flex justify-between items-center">
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
                                {item.description !== "" ? item.description : "No descripton has been added"}
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
                                }} className="bg-blue-500 text-sm text-white cursor-pointer px-4 py-1 rounded-lg hover:bg-blue-600 transition">
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 text-sm text-white cursor-pointer px-4  rounded-lg hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )).reverse()
            ) : (
                <p className="col-span-3 text-center text-gray-400 text-lg">
                    No todos available
                </p>
            )}
            <Modal />
        </div>
    );
};

export default Single;
