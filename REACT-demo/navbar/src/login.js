import React from "react";
import Input from "./input";

function login(props) {
  return (
    <form action="">
      <Input placeholder="Username" type="text" />
      <Input placeholder="Password" type="password" />
      {!props.isRegistered && (
        <Input placeholder="Confirm Password" type="password" />
      )}
      <button className="btn" type="submit">
        {props.isRegistered ? "Login " : "Register"}
      </button>
    </form>
  );
}
export default login;
