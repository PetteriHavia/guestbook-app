import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(null);

  return (
    <MessageContext.Provider value={{messages, setMessages}}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
    const context = useContext(MessageContext)
    if(!context) {
        throw new Error(
            "useContext must be used within a MessageContextProvider"
        );
    }
    return context;
}