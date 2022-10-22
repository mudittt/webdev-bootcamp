import nftActorClass "../nft/nft";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor OpenD {

  public type Listing = {
    itemOwner : Principal;
    itemPrice : Nat;
  };

  var mapOfNFTs = HashMap.HashMap<Principal, nftActorClass.nft>(1, Principal.equal, Principal.hash);

  var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);

  var mapOfListings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

  public shared (msg) func mint(name : Text, imageData : [Nat8]) : async Principal {
    let owner : Principal = msg.caller;
    Debug.print("Cycles Before :");
    Debug.print(debug_show (Cycles.balance()));
    Cycles.add(200_500_000_000);
    // Cycles.add(1000000000000);

    let newNFT = await nftActorClass.nft(name, owner, imageData);
    Debug.print("Cycles After :");
    Debug.print(debug_show (Cycles.balance()));

    let newNFTcanisterId : Principal = await newNFT.getCanisterId();

    mapOfNFTs.put(newNFTcanisterId, newNFT);
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
  };

  public query func getListedNFTs() : async [Principal] {
    let ids = Iter.toArray(mapOfListings.keys());

    return ids;
  };

  public shared (msg) func listItem(id : Principal, value : Nat) : async Text {
    var item : nftActorClass.nft = switch (mapOfNFTs.get(id)) {
      case null return ("NFT does not Exist.");
      case (?result) result;
    };
    let owner = await item.getOwner();
    if (Principal.equal(owner, msg.caller)) {
      let newListing : Listing = {
        itemOwner = owner;
        itemPrice = value;
      };
      mapOfListings.put(id, newListing);
      return "Success.";
    } else {
      return "You do not own the NFT.";
    };
  };

  public query func getOpenDCanisterId() : async Principal {
    return Principal.fromActor(OpenD);
  };

  public query func isListed(id : Principal) : async Bool {
    if (mapOfListings.get(id) == null) {
      return false;
    } else {
      return true;
    };
  };

  public query func getOriginalOwner(nftId : Principal) : async Principal {

    let listingDetails : Listing = switch (mapOfListings.get(nftId)) {
      case null return Principal.fromText("");
      case (?result) result;
    };
    return listingDetails.itemOwner;
  };

  public query func getListedNftPrice(nftId : Principal) : async Nat {
    let listingDetails : Listing = switch (mapOfListings.get(nftId)) {
      case null return 0;
      case (?result) result;
    };
    return listingDetails.itemPrice;
  };

  public shared (msg) func completePurchase(nftId : Principal, owner : Principal, newOwner : Principal) : async Text {
    var purchasedNFT : nftActorClass.nft = switch (mapOfNFTs.get(nftId)) {
      case null return "NFT does not Exist!";
      case (?result) result;
    };

    let transferResult = await purchasedNFT.transferOwnership(newOwner);
    if (transferResult == "Success.") {
      mapOfListings.delete(nftId);

      var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(nftId)) {
        case null List.nil<Principal>();
        case (?result) result;
      };
      ownedNFTs := List.filter(
        ownedNFTs,
        func(purchasedNFT : Principal) : Bool {
          return purchasedNFT != nftId;
        },
      );

      addToOwnershipMap(newOwner, nftId);

      return "Success.";
    } else {
      return "Error";
    }

  }

};
