import "./App.css";
import React from "react";

function EventHandler() {
  let [HeadingText, setHeadingText] = React.useState("hi");
  let [isMouseOver, setMouseOver] = React.useState(false);

  let buttonStyle = {
    backgroundColor: isMouseOver ? "slategray" : "antiquewhite",
    color: isMouseOver ? "#fff" : "#000",
    borderStyle: "none",
    margin: "2rem 0",
    padding: "0.7rem 1rem",
  };

  function handleClicked() {
    setHeadingText("submitted ;)");
  }

  function handleMouseOver() {
    setMouseOver(true);
    // console.log("Mouse Over");
  }

  function handleMouseOut() {
    setMouseOver(false);
    // console.log("Mouse Out");
  }

  return (
    <div className="App">
      <h1>{HeadingText}</h1>
      <input type="text" className="input" placeholder="What's Your Name?" />
      <button
        onClick={handleClicked}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={buttonStyle}
      >
        Submit
      </button>
    </div>
  );
}
export default EventHandler;
