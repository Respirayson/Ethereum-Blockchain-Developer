pragma solidity ^0.8.11;

contract StartStopExample {
    address owner;
    bool public paused;

    constructor() {
        owner = msg.sender;
    }

    function sendMoney() public payable {

    }

    function setBool(bool _paused) public {
        require(owner == msg.sender, "You are not the owner");
        paused = _paused;
    }

    function withdrawAllMoneyTo(address payable _to) public {
        require(owner == msg.sender, "You are not the owner");
        require(!paused, "Contract is paused");
        _to.transfer(address(this).balance);
    }

    function stopContract(address payable _to) public {
        require(owner == msg.sender, "You are not the owner");
        selfdestruct(_to);
    }
}