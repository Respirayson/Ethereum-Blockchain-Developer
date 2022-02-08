pragma solidity ^0.8.1;

contract RolloverExample {
    uint8 public myUint8;

    function decrement() public {
        unchecked {
            myUint8--;
        } 
    }

    function increment() public {
        myUint8++;
    }
}