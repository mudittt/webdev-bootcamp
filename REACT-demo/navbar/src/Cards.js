import React from "react";
function Cards(props) {
  return (
    <div className="card">
      <p className="card-content">{props.id}</p>
      <h2 className="card-title">{props.name}</h2>
      <p className="card-content">{props.tel}</p>
      <p className="card-content">{props.mail}</p>
    </div>
  );
}
export default Cards;
