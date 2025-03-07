import { StrictMode, useContext, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserProvider from './components/UserProvider.jsx'
// import UserContext from './components/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider
    >

      <App />

    </UserProvider>

  </StrictMode>,
)
