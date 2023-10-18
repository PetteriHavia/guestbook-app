import { useState, useEffect } from "react";

const Card = ({ item, generateRandomColor }) => {

  const formatDate = () => {
    const mongoDate = new Date(item.date);
    const date = mongoDate.getDate();
    const month = mongoDate.getMonth() + 1;
    const year = mongoDate.getFullYear();
    const hour = mongoDate.getHours();
    const minutes = mongoDate.getMinutes();
    const formatDate = hour +":" + minutes + " " + date + "/" + month +"/"+ year;
    return formatDate;
  }  

  const [randomColor, setRandomColor] = useState(generateRandomColor());
  const [date, setDate] = useState(formatDate());

  useEffect(() => {
    setRandomColor(generateRandomColor());
  }, []);

  const letter = item.name.charAt(0).toUpperCase();

  return (
    <div className="card">
      <div className="card-image" style={{ backgroundColor: randomColor }}>
        <h2>{letter}</h2>
      </div>
      <div className="card-info">
        <div className="card-person-name">
          <h4>{item.name}</h4>
        </div>
        <div className="card-message">
          <h4>{item.message}</h4>
        </div>
        <div className="card-date">
          <h4>{date}</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
