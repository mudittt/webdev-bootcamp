import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
// n75y4-jtr6y-7v5g6-z3whb-5j3gd-nal4v-q4mjg-nkvrh-nvxar-35luy-oae

// actor class in motoko
actor class nft(name : Text, owner : Principal, content : [Nat8]) = this {
    Debug.print("Working...");
    let itemName = name;
    let nftOwner = owner;
    let imageBytes = content;

    public query func getName() : async Text {
        return itemName;
    };
    public query func getOwner() : async Principal {
        return nftOwner;
    };
    public query func getAsset() : async [Nat8] {
        return imageBytes;
    };
    public query func getCanisterId() : async Principal {
        return Principal.fromActor(this);
    };
};
