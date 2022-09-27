import React from "react";

function input(props) {
  return (
    <input
      className="input"
      placeholder={props.placeholder}
      type={props.type}
    ></input>
  );
}

export default input;
