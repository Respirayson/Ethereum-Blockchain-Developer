// var MyToken = artifacts.require("MyToken.sol");
// var MyTokenSale = artifacts.require("MyTokenSale.sol");
var MyMintedToken = artifacts.require("MyMintedToken");
var MyMintedCrowdsale = artifacts.require("MyMintedCrowdsale")
var MyKycContract = artifacts.require("kycContract.sol");

require("dotenv").config({path: "../.env"});
// console.log(process.env)

module.exports = async function(deployer) {
  let address = await web3.eth.getAccounts();
  // await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  // await deployer.deploy(MyKycContract);
  // await deployer.deploy(MyTokenSale, 1, address[0], MyToken.address, MyKycContract.address);
  // let instance = await MyToken.deployed();
  // await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
  await deployer.deploy(MyMintedToken);
  await deployer.deploy(MyKycContract);
  await deployer.deploy(MyMintedCrowdsale, 1, address[0], MyMintedToken.address, MyKycContract.address);
  
  let instance = await MyMintedToken.deployed();
  await instance.addMinter(MyMintedCrowdsale.address);
  await instance.renounceMinter();
 
};
