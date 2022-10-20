import nftActorClass "../nft/nft";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";

actor OpenD {

  var mapOfNFTs = HashMap.HashMap<Principal, nftActorClass.nft>(1, Principal.equal, Principal.hash);

  var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

  public shared (msg) func mint(name : Text, imageData : [Nat8]) : async Principal {
    let owner : Principal = msg.caller;
    Debug.print(debug_show (Cycles.balance()));
    Cycles.add(200_500_000_000);
    // Cycles.add(1000000000000);

    let newNFT = await nftActorClass.nft(name, owner, imageData);
    Debug.print(debug_show (Cycles.balance()));

    let newNFTcanisterId : Principal = await newNFT.getCanisterId();

    addToOwnershipMap(owner, newNFTcanisterId);

    return newNFTcanisterId;
  };

  public func addToOwnershipMap(owner : Principal, nftId : Principal) {
    var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
      case null List.nil<Principal>();
      case (?result) result;
    };

    ownedNFTs := List.push(nftId, ownedNFTs);
    mapOfOwners.put(owner, ownedNFTs);
  };

  public query func getOwnedNFTs(owner : Principal) : async [Principal] {
    var userNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
      case null List.nil<Principal>();
      case (?result) result;
    };

    return List.toArray(userNFTs);
  }

};
