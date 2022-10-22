import React from "react";
import Item from "./Item";
import { Principal } from "@dfinity/Principal";

function Gallery(props) {
  const [items, setItems] = React.useState();

  function fetchNFTs() {
    // console.log(props.ids);
    if (props.ids != undefined) {
      setItems(
        props.ids.map((NFTid) => (
          <Item id={NFTid.toText()} key={NFTid.toText()} role={props.role} />
        ))
      );
    }
  }

  React.useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{props.title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
            {items}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
