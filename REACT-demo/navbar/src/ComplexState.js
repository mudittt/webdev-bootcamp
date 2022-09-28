import "./App.css";
import React from "react";

function ComplexState() {
  //   let [firstEnteredName, setFirstEnteredName] = React.useState("");
  //   let [lastEnteredName, setLastEnteredName] = React.useState("");
  let [contactInfo, setContactInfo] = React.useState({
    firstEnteredName: "",
    lastEnteredName: "",
    emailEntered: "",
  });

  //   function handleFirstName(e) {
  //     setFirstEnteredName(e.target.value);
  //     e.preventDefault();
  //   }
  //   function handleLastName(e) {
  //     setLastEnteredName(e.target.value);
  //     e.preventDefault();
  //   }
  function handleFullContactInfo(e) {
    // {there is a problem here, we are deleting one item of  the object basically}
    // if (e.target.name === "lName") {
    //   setFullName({ lastEnteredName: e.target.value });
    // } else {
    //   setFullName({ firstEnteredName: e.target.value });
    // }

    // thats why we defined a arrow function to access the previous value.
    setContactInfo((previousValue) => {
      // we must never use event (e) inside the setFullname type of funcions
      // synthetic event

      // destructuring an object, accessing name and value attribute
      let { name, value } = e.target;

      return {
        // spread operator .
        ...previousValue,
        // if we do not use the square brackets it will read 'name' as a string
        [name]: value,
      };

      /*
      if (name === "firstEnteredName") {
        return {
          firstEnteredName: value,
          lastEnteredName: previousValue.lastEnteredName,
          emailEntered: previousValue.emailEntered,
        };
      } else if (name === "lastEnteredName") {
        return {
          lastEnteredName: value,
          firstEnteredName: previousValue.firstEnteredName,
          emailEntered: previousValue.emailEntered,
        };
      } else if (name === "emailEntered") {
        return {
          emailEntered: value,
          lastEnteredName: previousValue.lastEnteredName,
          firstEnteredName: previousValue.firstEnteredName,
        };
      }
    });
    e.preventDefault();
    */
    });
  }

  return (
    <div className="App">
      <h1>
        {/* hi {firstEnteredName} {lastEnteredName} */}
        hi {contactInfo.firstEnteredName} {contactInfo.lastEnteredName}
      </h1>
      <p>*{contactInfo.emailEntered}*</p>
      <form action="">
        <input
          className="input"
          type="text"
          placeholder="First Name"
          //   name="fName"
          name="firstEnteredName"
          value={contactInfo.firstEnteredName}
          //   it will call the function 'handleFullContactInfo'
          //   whenever there is a change in the input.
          onChange={handleFullContactInfo}
          autoComplete="off"
          spellCheck="false"
        />

        <input
          className="input"
          type="text"
          placeholder="Last Name"
          //   name="lName"
          name="lastEnteredName"
          value={contactInfo.lastEnteredName}
          //   it will call the function 'handleFullContactInfo'
          //   whenever there is a change in the input.
          onChange={handleFullContactInfo}
          autoComplete="off"
          spellCheck="false"
        />

        <input
          className="input"
          type="email"
          placeholder="Email"
          name="emailEntered"
          value={contactInfo.emailEntered}
          //   it will call the function 'handleFullContactInfo'
          //   whenever there is a change in the input.
          onChange={handleFullContactInfo}
          autoComplete="off"
          spellCheck="false"
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
export default ComplexState;
