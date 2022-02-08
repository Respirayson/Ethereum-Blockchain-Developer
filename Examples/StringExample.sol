pragma solidity ^0.8.1;

contract StringExample {
    string public myString = "Hello World!";

    function setString(string memory _string) public {
        myString = _string;
    }
}