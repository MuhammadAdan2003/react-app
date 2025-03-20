import { useState, useRef, useEffect, useContext } from "react";
import UserProvider from "./UserContext";
import SelectDropdown from "./selectDropdown";
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
        editID,
        seteditID,
        matched,
        setmatched,
        dateVal,
        setDateVal,
        checkDate,
        setCheckDate,
        currDate,
        setCurrDate,
        Taskdate,
        setTaskDate,
        local,
        setLocal,
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

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleDate = (e) => {
        const now = new Date()
        const myDate = new Date(e.target.value)

        setCurrDate(now)
        setTaskDate(myDate)

        if (myDate < now) {
            setCheckDate(false);
            console.log("past");
            alert("cant add past date");
            setDateVal("");
            return;
        }

        else if (myDate == now) {
            console.log("now");
        }

        else {
            setCheckDate(true)
            console.log("future");
            setDateVal(e.target.value)
        }

    }

    // const checkOverdueTasks = () => {
    //     const now = new Date();
    //     setLocal((prevLocal) =>
    //         prevLocal.map((item) => {
    //             const itemDate = new Date(item.date);
    //             if (itemDate < now && item.dateStatus === true) {
    //                 console.log(`⏳ Task "${item.todo}" is overdue!`);
    //                 return { ...item, dateStatus: false };
    //             }

    //             return item;
    //         })
    //     );
    // };


    // useEffect(() => {
    //     console.log(checkDate);
    // }, [checkDate])


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log(`Hassan!`);
    //         local.forEach((item) => {
    //             if (new Date() > currDate) {
    //                 console.log(`"${item.todo}" is overdue!`);

    //             }

    //         });
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [currDate, local, checkDate]);

    const handleAdd = () => {
        if (todo === "" || priority === "" || date === "") {
            alert("Task cannot be empty");
            return;
        }

        const newTodos = todos.map(task =>
            task.id === matched
                ? { ...task, todo, priority, description: des, date: dateVal, dateStatus: checkDate }
                : task
        );

        if (!todos.some(task => task.id === matched)) {
            newTodos.push({ id: uuidv4(), todo, isCompleted: false, priority, description: des, date: dateVal, dateStatus: checkDate });
        }

        setTodos(newTodos);

        localStorage.setItem("todos", JSON.stringify(newTodos));
        window.dispatchEvent(new Event("storage"));
        setTodo("");
        setPriority("");
        setdes("");
    };

    const handleCancel = () => {
        seteditID(0);
        setmatched("");
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
                        className="bg-gray-800 p-6 rounded-lg shadow-lg lg:w-1/3 md:w-[80%] border border-gray-700"
                    >
                        <form action="">
                            <h2 className="text-xl font-bold mb-4 text-white">
                                {editID > 0 ? "Edit a task" : "Add new task"}
                            </h2>

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
                                maxLength="100"
                                value={des}
                                onChange={handleDes}
                                id="message"
                                rows="4"
                                className="w-full p-3 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                                placeholder="Enter up to 100 words..."
                            ></textarea>
                            <div className="flex flex-col">
                                <label className="text-white" htmlFor="">Due Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={dateVal}
                                    onChange={(e) => { handleDate(e) }}
                                    id="date"
                                    className="mt-2 cursor-pointer rounded p-2 bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <SelectDropdown onChange={handlePriority} />
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        seteditID(0);
                                        handleCancel()
                                    }}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleAdd();
                                        setIsModalOpen(false);
                                        handleCancel()
                                    }}
                                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                                >
                                    {editID > 0 ? "Edit" : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </>
    );
};

export default Modal;
