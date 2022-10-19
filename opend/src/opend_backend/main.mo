import nftActorClass "../nft/nft";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";

actor OpenD {
  public shared (msg) func mint(name : Text, imageData : [Nat8]) : async Principal {
    Cycles.add(1000000000000);
    Cycles.add(1000000000000);
    let owner : Principal = msg.caller;

    Debug.print(debug_show (Cycles.balance()));
    let newNFT = await nftActorClass.nft(name, owner, imageData);
    let newNFTcanisterId : Principal = await newNFT.getCanisterId();
    Debug.print(debug_show (Cycles.balance()));
    return newNFTcanisterId;
  };
};
