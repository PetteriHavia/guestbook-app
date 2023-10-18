import { useContext } from "react";
import { useMessageContext } from "../context/MessageContextProvider";

const Header = () => {
  const { messages } = useMessageContext();

  return (
    <div className="header-container">
      <div>
        <h1>Digital Guestbook</h1>
        <button>Write</button>
      </div>
      <h3>Messages: {messages && messages.length}</h3>
    </div>
  );
};

export default Header;
