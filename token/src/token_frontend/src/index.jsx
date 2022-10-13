import { token_backend } from "../../declarations/token_backend";
import { AuthClient } from "@dfinity/auth-client";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./components/App";

// const init = async () => {
//   const authClient = await AuthClient.create();

//   // it will keep th user logged in and will not ask for authentication again and again
//   if (await authClient.isAuthenticated()) {
//     // console.log("logged in");
//     handleAuthenticated(authClient);
//   } else {
//     await authClient.login({
//       identityProvider: "https://identity.ic0.app/#authorize",
//       onSucces: () => {
//         handleAuthenticated(authClient);
//       },
//     });
//   }
// };

// async function handleAuthenticated(authClient) {
//   console.log(authClient.getIdentity());
//   console.log(authClient.getIdentity()._principal);
//   console.log(authClient.getIdentity()._principal.toString());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// }

// init();
