import React from "react";
import { useForm } from "react-hook-form";
import { opend_backend } from "../../../declarations/opend_backend";
import { Principal } from "@dfinity/Principal";
import Item from "./Item";

function Minter() {
  let { register, handleSubmit } = useForm();
  const [principalId, setPrincipalId] = React.useState("");
  const [isLoaderHidden, setLoaderHidden] = React.useState(true);

  async function onSubmit(data) {
    setLoaderHidden(false);
    // console.log(data.name);
    // console.log(data.image);
    // console.log(data.image[0]);
    // console.log(data.image[0] instanceof Blob);

    const nftName = data.name;
    const imageBlob = data.image[0];
    const imageArray = await imageBlob.arrayBuffer();

    const nftImage = [...new Uint8Array(imageArray)];
    // console.log(nftImage);
    // console.log(opend_backend);
    const newNFTid = await opend_backend.mint(nftName, nftImage);

    //   console.log(newNFTid.toText());

    setPrincipalId(newNFTid);
    setLoaderHidden(true);
  }
  if (principalId == "") {
    return (
      <div className="minter-container">
        <div className="lds-ellipsis" hidden={isLoaderHidden}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
          Create NFT
        </h3>
        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Upload Image
        </h6>
        <form className="makeStyles-form-109" noValidate="" autoComplete="off">
          <div className="upload-container">
            <input
              {...register("image", { required: true })}
              className="upload"
              type="file"
              accept="image/png,image/jpeg,image/gif,image/svg+xml,image/webp,image/x-png"
            />
          </div>
          <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
            Collection Name
          </h6>
          <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
            <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
              <input
                {...register("name", { required: true })}
                placeholder="e.g. CryptoDunks"
                type="text"
                className="form-InputBase-input form-OutlinedInput-input"
              />
              <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
            </div>
          </div>
          <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
            <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">
              Mint NFT
            </span>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="minter-container">
        <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
          Minted!
        </h3>
        <div className="horizontal-center">
          <Item id={principalId.toText()} />
        </div>
      </div>
    );
    // return <h1>LOL</h1>;
  }
}

export default Minter;
