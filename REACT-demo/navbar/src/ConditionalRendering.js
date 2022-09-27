import "./App.css";
import React from "react";
import Login from "./login";
// eslint-disable-next-line
import Input from "./input";

let today = new Date();
let isUserRegistered = false;

function ConditionalRendering() {
  return (
    <div className="App">
      <h1>Conditional Rendering</h1>
      {/* using && operator*/}
      {today.getHours() > 12 && <h2>its past 12!</h2>}

      {/* using ternary operator*/}
      {/*isUserRegistered ? <h2>hi there!</h2> : <Login />*/}
      <Login isRegistered={isUserRegistered} />
    </div>
  );
}
export default ConditionalRendering;
