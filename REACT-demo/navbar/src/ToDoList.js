import "./ToDoList.css";
import React from "react";

let today = new Date();

function ToDoList() {
  let [enteredText, setEnteredText] = React.useState("");
  let [array, setArray] = React.useState([
    "React- toDoList completion",
    "Internship in November",
  ]);

  function handleText(e) {
    setEnteredText(e.target.value);
  }
  function handleClick(e) {
    setArray((previousArray) => {
      // modified the array using spread operator
      return [...previousArray, enteredText];
    });

    // this will clear the data in the input after we press the button.
    setEnteredText("");
    e.preventDefault();
  }
  return (
    <div className="ToDoList">
      <h1 className="ToDoList-title">My Day :]</h1>
      <p className="ToDoList-date">{today.toDateString()}</p>
      <div className="ToDoList-box">
        <form action="">
          <input
            onChange={handleText}
            className="input"
            type="text"
            placeholder="Add New Item To Your List"
            value={enteredText}
          />
          <button onClick={handleClick} className="btn">
            Add
          </button>
        </form>
        <ul>
          {array.map((item) => (
            <li className="ToDoList-box-list">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default ToDoList;
