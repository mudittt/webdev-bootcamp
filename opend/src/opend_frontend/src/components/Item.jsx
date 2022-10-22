import React from "react";
import { Principal } from "@dfinity/principal";
import { Actor } from "@dfinity/agent";
import { HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token_backend";
import { opend_backend } from "../../../declarations/opend_backend";
import Button from "./Button";
import PriceLabel from "./PriceLabel";
import CURRENT_USER_ID from "../index";

function Item(props) {
  const [nftName, setName] = React.useState();
  const [nftOwner, setOwner] = React.useState();
  const [nftImage, setImage] = React.useState();

  const [button, setButton] = React.useState();
  const [priceInput, setPriceInput] = React.useState();

  const [isLoaderHidden, setLoaderHidden] = React.useState(true);
  const [blurr, setBlurr] = React.useState();
  const [sellStatus, setSellStatus] = React.useState("");

  const [priceLabel, setPriceLabel] = React.useState();
  const [shouldDisplay, setShouldDisplay] = React.useState(true);

  const id = Principal.fromText(props.id);
  // const id = props.id;
  // console.log(id);

  // making a http request to fetch that canister
  // const localHost = "https://localhost:8080/";
  const localHost = "http://localhost:8000/";
  const agent = new HttpAgent({ host: localHost });

  // TODO: remove the following line when deploying live.
  agent.fetchRootKey();
  var NFTActor;

  async function loadNFT() {
    // console.log("Entered loadNFT");
    NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });
    // console.log(NFTActor);
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

    if (props.role == "collection") {
      let isNftListed = await opend_backend.isListed(id);
      // console.log(`Item Listed? - ${isNftListed}`);
      if (isNftListed) {
        setOwner("OpenD");
        setBlurr({ filter: "blur(4px)" });
        setSellStatus("Listed");
      } else {
        setButton(<Button handleClick={handleSell} text="Sell" />);
      }
    } else if (props.role == "discover") {
      const originalOwner = await opend_backend.getOriginalOwner(id);

      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text="Buy" />);
      }

      let price = await opend_backend.getListedNftPrice(id);
      setPriceLabel(<PriceLabel price={price.toString()} />);
    }
  }

  React.useEffect(() => {
    // console.log("useEffect working");
    loadNFT();
  }, []);

  let price;

  function handleSell() {
    console.log("Sell Clicked.");
    setPriceInput(
      <input
        placeholder="Price in DANG"
        type="number"
        className="price-input"
        value={price}
        onChange={(e) => {
          price = e.target.value;
        }}
      />
    );
    setButton(<Button handleClick={sellItem} text="Confirm" />);
  }

  async function handleBuy() {
    console.log("Buy was triggered!");
    setLoaderHidden(false);
    const TOKENActor = await Actor.createActor(tokenIdlFactory, {
      agent,
      canisterId: Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
    });
    console.log(TOKENActor);
    const sellerId = await opend_backend.getOriginalOwner(id);
    console.log(sellerId);
    const price = await opend_backend.getListedNftPrice(id);
    console.log(price);

    const transferInformation = await TOKENActor.transfer(sellerId, price);
    console.log(transferInformation);

    if (transferInformation == "Successfully Transfered!") {
      let completionResult = await opend_backend.completePurchase(
        id,
        sellerId,
        CURRENT_USER_ID
      );
      if (completionResult == "Success.") {
        setLoaderHidden(true);
        setShouldDisplay(false);
      }
    }
  }

  async function sellItem() {
    setLoaderHidden(false);
    setBlurr({ filter: "blur(4px)" });
    console.log("Confirm Clicked.");
    console.log(`Set Price - ${price}`);
    // id - particular nft canister id
    let listingResult = await opend_backend.listItem(id, Number(price));
    console.log(`Listing : ${listingResult}`);

    if (listingResult === "Success.") {
      console.log("Item Listed for Sale.");

      let opend_id = await opend_backend.getOpenDCanisterId();
      console.log(`opend_id - ${opend_id}`);

      console.log(`NFTActor - `);
      console.log(`${NFTActor}`);
      let transferResult = await NFTActor.transferOwnership(opend_id);

      console.log(`Transfer : ${transferResult}`);
      if (transferResult === "Success.") {
        setLoaderHidden(true);
        setButton();
        setPriceInput();
        setOwner("OpenD");
        setSellStatus("Listed");
      }
    }
  }

  return (
    <div
      style={{ display: shouldDisplay ? "inline" : "none" }}
      className="disGrid-item"
    >
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={nftImage}
          style={blurr}
        />
        <div className="lds-ellipsis" hidden={isLoaderHidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {nftName}
            <span className="purple-text"> {sellStatus}</span>
          </h2>
          {priceLabel}
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {nftOwner}
          </p>
          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
