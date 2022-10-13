// principals => user and canister smart contract IDs

// dfx identity get-principal
// to get my-own id
// n75y4-jtr6y-7v5g6-z3whb-5j3gd-nal4v-q4mjg-nkvrh-nvxar-35luy-oae
// 2vxsx-fae

// DFX_OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""

// Hashmap => Hashtable => mapping a key to a value
// we can work with our own datatypes/objects

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
// Iter - Iterators
import Iter "mo:base/Iter";

actor {

  // Debug.print("hi hello");
  let owner : Principal = Principal.fromText("n75y4-jtr6y-7v5g6-z3whb-5j3gd-nal4v-q4mjg-nkvrh-nvxar-35luy-oae");

  let totalSupply : Nat = 10 ** 6;
  let symbol : Text = "MEWD";

  // since Hashmaps cannot be stable
  private stable var balanceEntries : [(Principal, Nat)] = [];
  Debug.print(debug_show (balanceEntries));

  // < key, value >
  // ( *initialSizeOfTheHashmap*, howIsItGonnaCheckIfTheUserEnteredTheRight'key', howItShouldHashThoseKeys)
  // (size(Nat) , condition/func(Bool), (hash.hash) )
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  // func put( key : keyType , value : valueType );
  // overwrite the 'value' if 'key' already exists
  // balances.put(owner : Principal, totalSupply : Nat);
  // balances.put(owner, totalSupply);
  if (balances.size() < 1) {
    // size - Consumes an iterator
    // and counts how many elements were produced
    //(discarding them in the process).
    balances.put(owner, totalSupply);
  };

  // Gets the entry with the key k and returns its associated value if it existed
  // or null otherwise.
  public query func balanceOf(who : Principal) : async Nat {

    // ?Nat and Nat are different
    // Nat will return a Natural number always.
    // A value of type ?Nat can be constructed with either null or ?Nat

    // if (balances.get(who) == null) {
    //   return ?0;
    // } else {
    //   return (balances.get(who));
    // };

    let balance : Nat = switch (balances.get(who)) {
      case null 0;
      case (?result) result;
    };
    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  // shared it can be accessed by another canister/person
  public shared (msg) func payOut() : async Text {

    // msg => That person's unique principal id.
    // here i am only accessing it so, it will console log my 'id'

    // get will return true if the 'key' in the balances already exists,
    // and null if it doesn't exists
    if (balances.get(msg.caller) == null) {
      // Debug.print(debug_show (msg.caller));
      let ownerBalance = await balanceOf(owner);
      let amount = 1000;
      let newOwnerBalance : Nat = ownerBalance - amount;
      balances.put(msg.caller, amount);
      balances.put(owner, newOwnerBalance);
      return "Success!!";
    } else {
      return "Already Claimed";
    };
  };

  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    // balance of sender
    let fromBalance = await balanceOf(msg.caller);
    // Debug.print(debug_show (fromBalance));
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      // Debug.print(debug_show (newFromBalance));
      // updating the sender's account
      balances.put((msg.caller), newFromBalance);

      // balance of reciever
      let toBalance = await balanceOf(to);
      // Debug.print(debug_show (toBalance));
      let newToBalance : Nat = toBalance + amount;
      // Debug.print(debug_show (newToBalance));

      // updating the reciever's account
      balances.put(to, newToBalance);

      return "Successfully Transfered!";

    } else {
      return "Insufficient Funds!";
    };

  };

  //

  //
  system func preupgrade() {
    // entries - Returns an iterator over the key value pairs in this HashMap.
    // toArray - it will Iterate through a balanceEntries and collects its produced elements in an Array.
    balanceEntries := Iter.toArray(balances.entries());
  };
  system func postupgrade() {
    // update balance Hashmap according to the array balanceEntries
    // vals - an Iter over the values
    // fromIter - Clone from any iterator of key-value pairs
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
      balances.put(owner, totalSupply);
    };
  };

  //
};
