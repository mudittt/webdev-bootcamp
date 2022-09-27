import "./App.css";
import React from "react";
import Card from "./Cards";
import Contact from "./Contacts";

let today = new Date();
let wish;
let styled = {
  color: "black",
};
// let currentYear = today.getFullYear();
if (today.getHours() >= 5 && today.getHours() < 12) {
  wish = "Morning";
  styled.color = "dodgerblue";
} else if (today.getHours() >= 12 && today.getHours() < 16) {
  wish = "Afternoon";
  styled.color = "coral";
} else if (today.getHours() >= 16 && today.getHours() < 20) {
  wish = "Evening";
  styled.color = "crimson";
} else {
  wish = "Night";
  styled.color = "grey";
}

//
function createCard(contact) {
  return (
    <Card
      id={contact.id}
      // they key prop is not for us to use.
      key={contact.id}
      name={contact.name}
      tel={contact.telephone}
      mail={contact.email}
    />
  );
}

//
function App() {
  return (
    <div className="App">
      <h1 contentEditable="true" spellCheck="false">
        hi
      </h1>
      <h2 style={styled}>Good {wish} !</h2>
      {/* JSX in effect */}
      {/* we must pass the inline-style as an object */}
      {/* kabab case -> camel case */}

      {/*It will iterate through Contact array and pass each item of it in 'createCard' */}
      {Contact.map(createCard)}

      {/* <Card
        name={Contact[0].name}
        tel={Contact[0].telephone}
        mail={Contact[0].email}
      />
      <Card
        name={Contact[1].name}
        tel={Contact[1].telephone}
        mail={Contact[1].email}
      />
      <Card
        name={Contact[2].name}
        tel={Contact[2].telephone}
        mail={Contact[2].email}
      /> */}

      <footer style={{ color: "darkslategrey" }}>
        Copyright © {today.getFullYear()}
      </footer>
    </div>
  );
}

// we exported the function 'App' and imported it in the 'index.js' file.
export default App;
