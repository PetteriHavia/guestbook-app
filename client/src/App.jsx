import { createContext, useState } from 'react'
import "./styles/app.scss";
import Main from './components/Main';
import Sidebar from './components/Sidebar'
import { MessageContextProvider } from './context/MessageContextProvider';

function App() {

  const UseContext = createContext();

  return (
    <div className="app-container">
      <MessageContextProvider>
      <Sidebar />
      <Main />
      </MessageContextProvider>
    </div>
  )
}

export default App
