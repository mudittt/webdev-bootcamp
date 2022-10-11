import React from "react";

function AddNote(props) {
  let [enteredTitle, setEnteredTitle] = React.useState("");
  let [enteredContent, setEnteredContent] = React.useState("");

  function handleTitle(e) {
    setEnteredTitle(e.target.value);
  }

  function handleContent(e) {
    setEnteredContent(e.target.value);
  }

  return (
    <div className="input-container">
      <input
        className="input"
        type="text"
        placeholder="Title"
        value={enteredTitle}
        onChange={handleTitle}
        spellCheck="false"
      />
      <input
        className="input"
        type="text"
        placeholder="Take a note..."
        value={enteredContent}
        onChange={handleContent}
        spellCheck="false"
      />
      <button
        onClick={() => {
          props.isAdded(enteredTitle, enteredContent);
          setEnteredTitle("");
          setEnteredContent("");
        }}
        className="add-btn"
      >
        +
      </button>
    </div>
  );
}
export default AddNote;