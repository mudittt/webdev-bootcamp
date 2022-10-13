import React from "react";
import { token_backend } from "../../../declarations/token_backend";
import { Principal } from "@dfinity/principal";

function Balance() {

  const [inputValue, setInputValue] = React.useState("");
  const [balanceResult, setBalanceResult] = React.useState("?");
  const [isHidden, setHidden] = React.useState(true);

  async function handleClick() {
    // console.log("Balance Button Clicked");
    // text datatype
    // console.log(inputValue); 

    // principal datatype
    const principal = Principal.fromText(inputValue)

    // calling balanceOf
    // it will return an array
    const balance = await token_backend.balanceOf(principal);
    const symbol = await token_backend.getSymbol();

    setBalanceResult(balance.toLocaleString() +' '+ symbol);
    setInputValue("");
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance :</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=>{setInputValue(e.target.value)}}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult}</p>
    </div>
  );
}

export default Balance;