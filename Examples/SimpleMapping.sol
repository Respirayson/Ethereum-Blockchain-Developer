pragma solidity ^0.8.11;

contract MappingExample {
    mapping(uint => bool) public myMapping;
    mapping(address => bool) public myAddressMapping;
    mapping(uint => mapping(uint => bool)) public uintUintBoolMapping;

    function setValue(uint _index) public {
        myMapping[_index] = true;
    }

    function setMyAddressValue() public {
        myAddressMapping[msg.sender] = true;
    }

    function setDoubleMapping(uint _index1, uint _index2) public {
        uintUintBoolMapping[_index1][_index2] = true;
    }
}