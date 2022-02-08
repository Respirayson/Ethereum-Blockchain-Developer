pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Mintable.sol";
import "./crowdsale.sol";
import "./MintedCrowdsale.sol";
import "./kycContract.sol";

contract MyMintedToken is ERC20Mintable {
    constructor() ERC20("Rays", "RAY") {

    }
}

contract MyMintedCrowdsale is MintedCrowdsale {

    kycContract kyc;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        kycContract _kyc
    )
        MintedCrowdsale()
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;

    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(msg.sender), "KYC not completed, you are not allowed");
    }
}