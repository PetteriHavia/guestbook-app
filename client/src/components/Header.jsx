import { useContext } from "react";
import { useMessageContext } from "../context/MessageContextProvider";

const Header = () => {
  const { messages, toggle, setToggle } = useMessageContext();

  const showSidebar = () => {
    setToggle(!toggle);
  }

  return (
    <div className="header-container">
      <div>
        <h1>Digital Guestbook</h1>
        <button onClick={showSidebar}>Write</button>
      </div>
      <h3>Messages: {messages && messages.length}</h3>
    </div>
  );
};

export default Header;
