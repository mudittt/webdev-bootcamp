import React from "react";

function ToDoItems(props) {
  //   let [isClicked, setClicked] = React.useState(false);

  return (
    // <div
    //   onClick={() => {
    //     setClicked((prevValue) => {
    //       return !prevValue;
    //     });
    //   }}
    // >
    //   <li
    //     className="ToDoList-box-list"
    //     style={{
    //       textDecoration: isClicked && "line-through",
    //       cursor: "pointer",
    //     }}
    //   >
    //     {props.text}
    //   </li>
    // </div>
    <div
      onClick={() => {
        // whenever this div will get clicked, it will
        // send the prop back with another prop
        props.onClicked(props.id);
      }}
    >
      <li className="ToDoList-box-list">{props.text}</li>
    </div>
  );
}
export default ToDoItems;
