import React from "react";
function InputArea(props) {
  let [enteredText, setEnteredText] = React.useState("");

  function handleText(e) {
    setEnteredText(e.target.value);
  }

  return (
    <div>
      <input
        onChange={handleText}
        className="input"
        type="text"
        placeholder="Add New Item To Your List"
        value={enteredText}
      />
      <button
        onClick={() => {
          props.Click(enteredText);
          // this will clear the data in the input after we press the button.
          setEnteredText("");
        }}
        className="btn"
      >
        Add
      </button>
    </div>
  );
}
export default InputArea;
