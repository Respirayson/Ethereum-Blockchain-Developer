pragma solidity ^0.8.11;

contract SomeContract {
     uint public myUint = 10;

    function setUint (uint _myuint) public {
        myUint = _myuint;
    }
}