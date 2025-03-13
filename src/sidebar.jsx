import { useState, useRef, useEffect, useContext } from "react";
import UserContext from './components/UserContext';
import Modal from "./components/modal"
const SidebarLayout = () => {
    const modalRef = useRef(null);
    const { isModalOpen, setIsModalOpen, isOpen, setIsOpen, check, setcheck, status, setstatus, local, setlocal, filteredTodos, setFilteredTodos } = useContext(UserContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        }

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },
        [isModalOpen]);

    const handlePriority = (e) => {
        setcheck(e.target.value)
    }

    // const handleStatus = (e) => {
    //     const newStatus = e.target.value;
    //     setstatus(newStatus);

    //     if (newStatus === "" || newStatus === "All") {
    //         setFilteredTodos(local);
    //     } else {
    //         const value = newStatus === "Completed";
    //         setFilteredTodos(local.filter(item => item.status === value));
    //     }
    // };




    return (
        <>
            <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden relative z-40">
                <div className="flex justify-between items-center w-64">
                    <a href="#" className="block p-4 text-white font-bold">
                        Todo app
                    </a>
                    <div>
                        <p className="text-white jambo"
                            onClick={(e) => {
                                setIsOpen(!isOpen);
                                handleCancel(e);
                            }}

                        >kato</p>
                    </div>
                </div>

                <button
                    className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div >

            <div style={{ zIndex: 10 }} className={`sidebar bg-gray-800 text-white w-64 space-y-6 py-5 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
                <a href="#" className="text-white flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">Todo app</span>
                </a>

                <nav>
                    {[
                        { name: "Add new task", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", action: () => setIsModalOpen(true) },

                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={item.action}
                            className="block py-2.5 px-4 flex items-center space-x-2 rounded transition duration-200 hover:bg-purple-500 hover:text-white w-full text-left"
                        >
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                            </svg>
                            <span>{item.name}</span>
                        </button>
                    ))}
                    <select
                        className="mt-5 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-white bg-gray-900 bg-clip-padding bg-no-repeat border border-solid border-gray-600 rounded transition ease-in-out m-0 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                        aria-label="Default select example"
                        onChange={(e) => { handlePriority(e) }}
                    >
                        <option className="bg-gray-900 text-white" disabled defaultValue>Select priority</option>
                        <option className="bg-gray-900 text-white" value="All">All</option>
                        <option className="bg-gray-900 text-white" value="High">High</option>
                        <option className="bg-gray-900 text-white" value="Medium">Medium</option>
                        <option className="bg-gray-900 text-white" value="Low">Low</option>
                    </select>
                    <select name="" id="" className="mt-5 form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-white bg-gray-900 bg-clip-padding bg-no-repeat border border-solid border-gray-600 rounded transition ease-in-out m-0 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none">
                        <option className="bg-gray-900 text-white" defaultValue>Select Status</option>
                        <option className="bg-gray-900 text-white" value="All">All</option>
                        <option className="bg-gray-900 text-white" value="Completed">Completed</option>
                        <option className="bg-gray-900 text-white" value="Incompleted">Incompleted</option>
                    </select>

                </nav>
            </div>
            <Modal />
        </>
    );
};

export default SidebarLayout;
