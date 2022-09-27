function Note(props) {
  return (
    // we recieved an object as 'props' whose elements can be accessed by the dot notation.
    <div className="note">
      <h3 className="note-title">{props.head}</h3>
      <p className="note-content">{props.text}</p>
    </div>
  );
}
export default Note;
