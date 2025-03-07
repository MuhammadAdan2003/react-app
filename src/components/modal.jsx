import { useState, useRef, useEffect, useContext } from "react";
// import UserContext from "./components/UserProvider";
import UserProvider from "./UserContext"
import SelectDropdown from "./selectDropdown"
import { v4 as uuidv4 } from "uuid";

const Modal = () => {
    const modalRef = useRef(null);
    const {
        todo,
        setTodo,
        todos,
        setTodos,
        priority,
        setPriority,
        des,
        setdes,
        isModalOpen,
        setIsModalOpen,
    } = useContext(UserProvider);

    const handleDes = (e) => {
        setdes(e.target.value);
    };

    const handlePriority = (e) => {
        setPriority(e.target.value);
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             setIsModalOpen(false);
    //         }
    //     }

    //     if (isModalOpen) {
    //         document.addEventListener("mousedown", handleClickOutside);
    //     }

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [isModalOpen]);

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleAdd = () => {
        if (todo === "" || priority === "") {
            alert("Task cannot be empty");
            return;
        }

        const newTodos = [
            ...todos,
            { id: uuidv4(), todo, isCompleted: false, priority, description: des },
        ];
        setTodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));

        window.dispatchEvent(new Event("storage"));

        setTodo("");
        setPriority("");
        setdes("");
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#00000080] bg-opacity-50 z-50">
                    <div
                        ref={modalRef}
                        className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 border border-gray-700"
                    >
                        <h2 className="text-xl font-bold mb-4 text-white">Add New Task</h2>

                        <input
                            type="text"
                            value={todo}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            placeholder="Enter task..."
                        />

                        <label
                            htmlFor="message"
                            className="mt-5 mb-3 block text-sm font-medium text-white"
                        >
                            Your message
                        </label>
                        <textarea
                            value={des}
                            onChange={handleDes}
                            id="message"
                            rows="4"
                            className="w-full p-3 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                            placeholder="Write your thoughts here..."
                        ></textarea>

                        {/* Ensure SelectDropdown component is imported or defined */}
                        <SelectDropdown onChange={handlePriority} />

                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleAdd();
                                    setIsModalOpen(false);
                                }}
                                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
