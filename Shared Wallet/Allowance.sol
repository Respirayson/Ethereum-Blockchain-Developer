pragma solidity ^0.8.11;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Allowance is Ownable {
    event AllowanceChanged (address indexed _forWho, address indexed _fromWho, uint _old, uint _new);

    function isOwner() public view returns(bool) {
        return msg.sender == owner();
    }

    modifier ownerOrAllowed(uint _amount) {
        require(isOwner() || allowanceAllocated[msg.sender] >= _amount, "You are not allowed");
        _;
    }

    mapping(address => uint) public allowanceAllocated;

    function setAllowance(address _address, uint _allowance) public onlyOwner {
        emit AllowanceChanged (_address, msg.sender, allowanceAllocated[_address], _allowance);
        allowanceAllocated[_address] = _allowance;
    }

    function reduceAllowance(address _who, uint _amount) internal {
        emit AllowanceChanged (_who, msg.sender, allowanceAllocated[_who], allowanceAllocated[_who] - _amount);
        allowanceAllocated[_who] -= _amount;
    }
}