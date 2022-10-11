import List "mo:base/List";
import Debug "mo:base/Debug";

actor dkeeper {

  Debug.print("Accesed Database");

  // creating a new datatype in motoko
  // public because we will access it from js file
  public type Note = {
    title : Text;
    content : Text;
  };

  // new data type 'List'
  // think of it as a Stack
  // array of Note objects
  // currently empty (nil)
  stable var notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText : Text, contentText : Text) {
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    // changed notes
    // pushed into List.
    notes := List.push(newNote, notes);
    Debug.print(debug_show (notes));
  };

  // it will return array of 'Note' type.
  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(id : Nat) {
    // notes := List.filter(notes, func(item : Note) : { item.id != id });
    let listFront = List.take(notes, id);
    // it will drop the elements after that perticular 'id'
    let listBack = List.drop(notes, id +1);
    // it will drop the elements before that perticular 'id'
    // and since we adding that '+1'
    // object at that perticular 'id' will also be deleted
    notes := List.append(listFront, listBack);
    // merging the two parts.
    Debug.print(debug_show (notes));
  };
};
