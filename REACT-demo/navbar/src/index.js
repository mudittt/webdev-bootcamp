import React from "react";
// const React = require('react')
import ReactDOM from "react-dom/client";
import "./index.css";

// imported the App function to use it as a REACT COMPONENT
// eslint-disable-next-line
import App from "./App";
// eslint-disable-next-line
import ConditionalRendering from "./ConditionalRendering";
import HooksState from "./Hooks-State";

const root = ReactDOM.createRoot(document.getElementById("root"));
// ReactDOM.render(WHAT_TO_SHOW, WHERE_TO_SHOW, CALLBACK)
root.render(
  <React.StrictMode>
    {/* used App function as a tag. */}
    {/* <App /> */}
    {/* <ConditionalRendering /> */}
    <HooksState />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
