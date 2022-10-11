import React from "react";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";
import AddNote from "./addNote";
import { dkeeper_backend }  from "../../../declarations/dkeeper_backend";


function App() {
  let [notes, setNotes] = React.useState([
    // {
    //   head: "reactJS",
    //   text: "React is a JavaScript library, so it runs on the client side and it does not run on the server because it is built with JavaScript. So remember, React is a JavaScript library.",
    // },
    // {
    //   head: "jQuery",
    //   text: "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation.",
    // },
    // {
    //   head: "mongoDB",
    //   text: "MongoDB is a source-available cross-platform document-oriented NoSQL database program. MongoDB uses JSON -like documents with optional schemas.",
    // },
   
  ]);

  // useEffect is called everytime a renderFunction is called.
  React.useEffect(() => {
    console.log("useEffect is working.");
    // we are using fetchData because it has to be async 
    // and useEffect cannot be async
    fetchData();
  },[]);
  // empty array will prevent the infinite loop


  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    console.log(notesArray);
    setNotes(notesArray);
    // the above line will force the page to re-render 
    // because there has been a change of state.
    // and then again useEffect will be called. 
    // infinite loop unless we add a condition to the useEffect()
  }

  function handleAddedNote(Title, Content) {
    dkeeper_backend.createNote(Title, Content);
    setNotes((oldNotes) => {
      // return [...oldNotes, { head: Title, text: Content }];
      return [{ title: Title, content: Content }, ...oldNotes];
    });
  }

  function handleDeletion(id) {
    dkeeper_backend.removeNote(id);
    setNotes((oldNotes) => {
      return oldNotes.filter((item, index) => {
        return index !== id;
      });
    });
  }

   
  return (
    <div className="App">
      <Header />
      <AddNote isAdded={handleAddedNote} />
      <div className="note-container">
        {notes.map((item, index) => {
          return (
            // <Note
            //   key={index}
            //   head={item.head}
            //   text={item.text}
            //   id={index}
            //   isDelete={handleDeletion}
            // />
            <Note
              key={index}
              head={item.title}
              text={item.content}
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