import React from "react";
import { token_backend } from "../../../declarations/token_backend";
// import { canisterId } from "../../../declarations/token_backend";
// import { createActor } from "../../../declarations/token_backend";
// import { AuthClient } from "@dfinity/auth-client";

function Faucet() {
  const [isDisabled, setDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Gimme gimme");

  async function handleClick() {
    setDisabled(true);

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    // const result = await authenticatedCanister.payOut();
    const result = await token_backend.payOut();
    // token_backend.payOut();
    setButtonText(result);
    // setDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free MEWD-IT tokens here! Claim 1000 MEWD coins to your
        account.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
