import "./App.css";
import React from "react";
import Header from "./header.js";
import Footer from "./footer.js";
import Note from "./note.js";
import AddNote from "./addNote";
// import notesList from "./notesList";

function App() {
  let [notes, setNotes] = React.useState([
    {
      head: "reactJS",
      text: "React is a JavaScript library, so it runs on the client side and it does not run on the server because it is built with JavaScript. So remember, React is a JavaScript library.",
    },
    {
      head: "jQuery",
      text: "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation.",
    },
    {
      head: "mongoDB",
      text: "MongoDB is a source-available cross-platform document-oriented NoSQL database program. MongoDB uses JSON -like documents with optional schemas.",
    },
    {
      head: "javaScipt",
      text: "It is an interpreted programming language with object-oriented capabilities. Netscape changed its name to JavaScript, possibly because of the excitement being generated by Java.",
    },
    {
      head: "mongoose",
      text: "Mongoose.module is an external module of the node.js. Mongoose is a MongoDB ODM that is used to translate the code and its representation from MongoDB to the Node.js server.",
    },
  ]);

  function handleAddedNote(Title, Content) {
    setNotes((oldNotes) => {
      return [...oldNotes, { head: Title, text: Content }];
    });
  }

  function handleDeletion(id) {
    // console.log(id);
    setNotes((oldNotes) => {
      return oldNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="App">
      <Header />
      {/* its like we are sending these 'text' as an object as 'props' */}
      {/* <Note
        head="This is the note-title"
        text="This is the note-content bla bla bla bla"
      />
      <Note head="REACT_PROPS" text="Here is an example of REACT_PROPS" />
      <Note
        head="This is the note-title"
        text="This is the note content bla bla bla bla"
      /> */}
      <AddNote isAdded={handleAddedNote} />
      <div className="note-container">
        {notes.map((item, index) => {
          return (
            <Note
              key={index}
              head={item.head}
              text={item.text}
              id={index}
              isDelete={handleDeletion}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
