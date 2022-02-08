pragma solidity ^0.6.11;

contract ExceptionExample {
    mapping(address => uint64) public balanceReceived;

    function receiveMoney() payable public {
        assert(msg.value == uint64(msg.value));
        balanceReceived[msg.sender] += uint64(msg.value);
        assert(balanceReceived[msg.sender] > balanceReceived[msg.sender] + uint64(msg.value));
    }

    function withdrawMoney(address payable _to, uint64 _amount) public {
        require(_amount <= balanceReceived[msg.sender], "Insufficient funds");
        assert(balanceReceived[msg.sender] >= balanceReceived[msg.sender] - _amount);
        balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);
    }
}