pragma solidity ^0.8.11;

import "./Allowance.sol";

contract SharedWallet is Allowance {
    event moneySent(address indexed _beneficiary, uint _amount);
    event moneyReceived(address indexed _from, uint _amount);

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    receive() external payable {
        emit moneyReceived(msg.sender, msg.value);
    }

    /**
    function withdrawMoneyAllocated(uint _amount) public {
        address payable _to;
        _to = payable(msg.sender);
        require(_amount <= allowanceAllocated[_to], "Insufficient funds allocated");
        assert(totalBalance >= totalBalance - _amount);
        totalBalance -= _amount;
        _to.transfer(_amount);
    }
    **/

    function withdrawMoney(address payable _address, uint _amount) public ownerOrAllowed(_amount) {
        require(_amount <= address(this).balance, "Insufficient funds in contract");
        if (!isOwner()) {
            reduceAllowance(_address, _amount);
        }
        emit moneySent(_address, _amount);
        _address.transfer(_amount);
    }

    function renounceOwnership() public view override onlyOwner {
        revert("Cannot renounce ownership");
    }
}