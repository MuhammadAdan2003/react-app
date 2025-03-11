import React, { useState } from 'react';
import UserContext from './UserContext';
import App from '../App';

const UserProvider = ({ children }) => {
    const [check, setcheck] = useState("")
    const [matched, setmatched] = useState("")
    const [editID, seteditID] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState('hassan');
    const [todo, setTodo] = useState("");
    const [priority, setPriority] = useState("")
    const [des, setdes] = useState("")
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const toggleUser = () => {
        setUser(user === 'Hassan' ? 'Adan' : 'Hassan');
    };
    return (
        <UserContext.Provider value={{ user, toggleUser, todo, setTodo, todos, setTodos, priority, setPriority, des, setdes, isModalOpen, setIsModalOpen, isOpen, setIsOpen, editID, seteditID, matched, setmatched, check, setcheck }}>
            {children}
            {/* <App /> */}
        </UserContext.Provider>
    );
};

export default UserProvider;