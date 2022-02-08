pragma solidity ^0.8.1;

contract BooleanExample {
    bool public myBool;

    function setMyBool(bool _mybool) public {
        myBool = !_mybool;
    }
}