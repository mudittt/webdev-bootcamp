import "./App.css";
import React from "react";

function HooksState() {
  // it will produce an array of two item
  // where first item will be whatever is inside the parenthesis of useState( xyz ) -> initial value
  // second item will be a function
  let [count, setCount] = React.useState(0);
  // array destructuring
  // stored the first item in 'count'
  // stored the 2nd item as 'setCount'

  function increase() {
    setCount(++count);
  }

  function decrease() {
    setCount(--count);
  }

  // Time
  //   let time = "TIME";
  let time = new Date().toLocaleTimeString();
  // array destructuring
  let [newTime, setTime] = React.useState(time);

  // dynamically update time every second
  setInterval(getTime, 1000);

  function getTime() {
    time = new Date().toLocaleTimeString();
    // to set a new value of time using 2nd item of the array we got from useState
    setTime(time);
  }

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={decrease} className="btn">
        ( - )
      </button>
      <button onClick={increase} className="btn">
        ( + )
      </button>
      <p>-------------------------------------------</p>
      <h1>{newTime}</h1>
      <p>hahahaah you know what itiz imma imma brown boi</p>
      <button onClick={getTime} className="btn">
        Get Time
      </button>
      <p>-------------------------------------------</p>
    </div>
  );
}

export default HooksState;
