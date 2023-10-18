import { useEffect } from "react";
import Header from "./Header";
import Card from "./Card";
import { useMessageContext } from "../context/MessageContextProvider";

const Main = () => {
  //const [messages, setMessages] = useState(null);
  const {messages, setMessages} = useMessageContext();

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  useEffect(() => {
    fetchMessages();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/messages");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  return (
    <div className="main">
      <div className="main-inner">
        <Header />
        <div className="cards-container">
          {messages &&
            messages.map((item) => (
              <Card
                key={item._id}
                item={item}
                generateRandomColor={generateRandomColor}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
