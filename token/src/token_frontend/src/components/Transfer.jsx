import React from "react";
import { token_backend } from "../../../declarations/token_backend";
import { Principal } from "@dfinity/principal";
// import { canisterId } from "../../../declarations/token_backend";
// import { createActor } from "../../../declarations/token_backend";
// import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [toAccountInput, setToAccount] = React.useState("");
  const [amountInput, setAmount] = React.useState("");
  const [isDisabled, setDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Transfer");

  async function handleClick() {
    setDisabled(true);

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    const principal = Principal.fromText(toAccountInput);
    console.log(typeof amountInput); // string
    // const result = await authenticatedCanister.transfer(
    //   principal,
    //   Number(amountInput)
    // );
    const result = await token_backend.transfer(principal, Number(amountInput));
    console.log(result);
    setButtonText(result);

    setToAccount("");
    setAmount("");
    setTimeout(() => {
      setButtonText("Transfer");
      setDisabled(false);
    }, 2000);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={(e) => {
                  setToAccount(e.target.value);
                }}
                value={toAccountInput}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                value={amountInput}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            {buttonText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
