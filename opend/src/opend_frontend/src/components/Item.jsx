import React from "react";
import { Principal } from "@dfinity/principal";
import { Actor } from "@dfinity/agent";
import { HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";

function Item(props) {
  const [nftName, setName] = React.useState();
  const [nftOwner, setOwner] = React.useState();
  const [nftImage, setImage] = React.useState();
  const id = Principal.fromText(props.id);
  console.log(id);

  // making a http request to fetch that canister
  // const localHost = "https://localhost:8080/";
  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });
  async function loadNFT() {
    console.log("Entered loadNFT");
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });
    console.log(NFTActor);
    // console.log(NFTActor.getName());
    // console.log(NFTActor.getOwner());
    // console.log(NFTActor.getAsset());
    const nftName = await NFTActor.getName();
    const nftOwner = await NFTActor.getOwner();
    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const nftImage = URL.createObjectURL(
      new Blob([imageContent.buffer], { type: "image/png" })
    );

    setName(nftName);
    setOwner(nftOwner.toText());
    setImage(nftImage);
  }

  React.useEffect(() => {
    console.log("useEffect working");
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={nftImage}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {nftName}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {nftOwner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
