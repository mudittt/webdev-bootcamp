function Note(props) {
  return (
    // we recieved an object as 'props' whose elements can be accessed by the dot notation.
    <div className="note">
      <h3 className="note-title">{props.head}</h3>
      <p className="note-content">{props.text}</p>
      <button
        className="note-btn"
        onClick={() => {
          props.isDelete(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
}
export default Note;
