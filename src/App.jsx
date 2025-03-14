// import { useState, useEffect, createContext, useContext } from 'react'
import Single from './components/Single';
// import { v4 as uuidv4 } from 'uuid';
import './App.css'
// import SelectDropdown from './components/selectDropdown';
// import clsx from "clsx";
import UserContext from './components/UserContext';
// import Calendar from './components/date'
import SidebarLayout from './sidebar';
function App() {
  return (
    <>
      <div className="relative min-h-screen md:flex">
        <SidebarLayout />
        <Single />
        
      </div >
    </>
  )
}

export default App
