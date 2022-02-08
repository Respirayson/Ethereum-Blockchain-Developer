pragma solidity ^0.8.1;

contract MyContract {
    string public myString = "Hello world!";

    address public myAddress;

    function setAddress(address _myaddress) public {
    myAddress = _myaddress;
    }
}

