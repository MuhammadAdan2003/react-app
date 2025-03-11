import { useState, useRef, useEffect, useContext } from "react";
import UserContext from './components/UserContext';
import Modal from "./components/modal"
const SidebarLayout = () => {
    const modalRef = useRef(null);
    const { isModalOpen, setIsModalOpen, isOpen, setIsOpen } = useContext(UserContext);

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

    return (
        <>
            <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden relative z-40">
                <a href="#" className="block p-4 text-white font-bold">
                    Todo app
                </a>
                <button
                    className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div className={`sidebar bg-gray-800 text-white w-64 space-y-6 py-5 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
                <a href="#" className="text-white flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">Todo app</span>
                </a>

                <nav>
                    {[
                        { name: "Add new task", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", action: () => setIsModalOpen(true) },
                        { name: "About", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                        { name: "Theme", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
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
                </nav>
            </div>
            <Modal />
        </>
    );
};

export default SidebarLayout;
