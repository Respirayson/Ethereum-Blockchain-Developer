pragma solidity ^0.8.11;

contract WillThrow {
    function aFunction() public {
        require(false, "Always False");
    }
}

contract ErrorHandling {
    event ErrorLogging(string reason);

    function catchError() public {
        WillThrow will = new WillThrow();
        try will.aFunction() {
            // if it works
        } catch Error(string memory reason) {
            emit ErrorLogging(reason);
        }
    }
}