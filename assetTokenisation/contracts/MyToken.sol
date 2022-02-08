pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Rays", "RAY") {
        _mint(msg.sender, initialSupply);
    }
}