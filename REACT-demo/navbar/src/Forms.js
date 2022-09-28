import "./App.css";
import React from "react";
function Forms() {
  let [enteredName, setenteredName] = React.useState("");
  let [HeadingName, setHeadingName] = React.useState("");

  function handleChange(event) {
    // console.log(event.target.value);
    setenteredName(event.target.value);
    // console.log(event.target.placeholder);
    // console.log(event.target.className);
  }

  function handleClick(event) {
    setHeadingName(enteredName);

    // this will prevent the form to refresh itself
    event.preventDefault();
  }

  return (
    <div className="App">
      {/* form automatically refresh itself after we press the  */}
      {/* to prevent this default action we use a function */}
      <form onSubmit={handleClick}>
        <h1>Bonjour {HeadingName} :]</h1>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's Your name?"
          className="input"
          autoComplete="off"
          spellCheck="false"
          value={enteredName}
        />
        <button type="submit" onClick={handleClick} className="btn">
          Enter
        </button>
      </form>
    </div>
  );
}
export default Forms;
