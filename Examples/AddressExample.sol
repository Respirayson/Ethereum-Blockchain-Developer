pragma solidity ^0.8.1;

contract AddressExample {
    address public MyAddress;

    function setAddress(address _address) public {
        MyAddress = _address;
    }

    function getBalanceOfAccount() public view returns(uint) {
        return MyAddress.balance
    }
}

