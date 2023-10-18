import { useMessageContext } from "../context/MessageContextProvider";

const Sidebar = () => {
  const { toggle } = useMessageContext();

  return (
      <div className={`sidebar ${toggle ? "show" : ""}`}>
      
      </div>
  );
};

export default Sidebar;
