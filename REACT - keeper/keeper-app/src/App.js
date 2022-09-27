import "./App.css";
import Header from "./header.js";
import Footer from "./footer.js";
import Note from "./note.js";

function App() {
  return (
    <div className="App">
      <Header />
      {/* its like we are sending these 'text' as an object as 'props' */}
      <Note
        head="This is the note-title"
        text="This is the note-content bla bla bla bla"
      />
      <Note head="REACT_PROPS" text="Here is an example of REACT_PROPS" />
      <Note
        head="This is the note-title"
        text="This is the note content bla bla bla bla"
      />
      <Footer />
    </div>
  );
}

export default App;
