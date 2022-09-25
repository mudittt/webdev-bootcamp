import "./App.css";

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
function App() {
  return (
    <div className="App">
      <h1 contentEditable="true" spellCheck="false">
        hi
      </h1>
      <h2 style={styled}>Good {wish} !</h2>
      <ul>
        {/* JSX in effect */}

        <li>i do not lie {9 + 8}</li>
        <li>or do i?</li>
        <li>A random number = {Math.floor(Math.random() * 9)}</li>
        <li>yea. sure. i do not lie.</li>
      </ul>

      {/* we must pass the inline-style as an object */}
      {/* kabab case -> camel case */}

      <footer style={{ color: "darkslategrey" }}>
        Copyright © {today.getFullYear()}
      </footer>
    </div>
  );
}

// we exported the function 'App' and imported it in the 'index.js' file.
export default App;
