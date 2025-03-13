import React, { useState } from 'react';
import UserContext from './UserContext';
import App from '../App';

const UserProvider = ({ children }) => {
    const [statusTask, setstatusTask] = useState("")
    const [check, setcheck] = useState("")
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [matched, setmatched] = useState("")
    const [editID, seteditID] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState('hassan');
    const [todo, setTodo] = useState("");
    const [priority, setPriority] = useState("")
    const [des, setdes] = useState("")
    const [local, setLocal] = useState(() => {
        return JSON.parse(localStorage.getItem("todos")) || [];
    });
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const toggleUser = () => {
        setUser(user === 'Hassan' ? 'Adan' : 'Hassan');
    };
    return (
        <UserContext.Provider value={{ user, toggleUser, todo, setTodo, todos, setTodos, priority, setPriority, des, setdes, isModalOpen, setIsModalOpen, isOpen, setIsOpen, editID, seteditID, matched, setmatched, check, setcheck, statusTask, setstatusTask, filteredTodos, setFilteredTodos, local, setLocal }}>
            {children}
            {/* <App /> */}
        </UserContext.Provider>
    );
};

export default UserProvider;