import "./ToDoList.css";
import React from "react";
import ToDoItems from "./ToDoItems";
import InputArea from "./InputArea";

let today = new Date();

function ToDoList() {
  let [array, setArray] = React.useState([
    "React- toDoList completion",
    "Internship in November",
  ]);

  function handleClick(enteredText) {
    setArray((previousArray) => {
      // modified the array using spread operator
      return [...previousArray, enteredText];
    });
  }

  function deleteItem(id) {
    // accessing the previous array
    setArray((previousArray) => {
      // filtering it
      // read the docs for the arguements and parameters of the callback fn
      return previousArray.filter((item, index) => {
        // the condition
        return index !== id;
      });
    });
  }

  return (
    <div className="ToDoList">
      <h1 className="ToDoList-title">My Day :]</h1>
      <p className="ToDoList-date">{today.toDateString()}</p>
      <div className="ToDoList-box">
        <ul>
          {array.map((item, index) => (
            <ToDoItems
              text={item}
              key={index}
              id={index}
              // here we got the div with its id
              // and called the function 'deleteItem'
              onClicked={deleteItem}
            />
          ))}
        </ul>
        <InputArea Click={handleClick} />
      </div>
    </div>
  );
}
export default ToDoList;
