const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const kycContract = artifacts.require("kycContract");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("Tokensale Test", async(accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("should not have any tokens in my Deployeraccount", async() => {
        let instance = await Token.deployed();
        return await expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the TokenSale Contract by Default", async() => {
        let instanceToken = await Token.deployed();
        let balanceOfTokenSale = await instanceToken.balanceOf(TokenSale.address);
        let totalSupply = await instanceToken.totalSupply();
        return await expect(balanceOfTokenSale).to.be.a.bignumber.equal(totalSupply);
    })

    it("should be possible to buy tokens", async() => {
        let instanceToken = await Token.deployed();
        let instanceTokenSale = await TokenSale.deployed();
        let instanceKycContract = await kycContract.deployed();
        await instanceKycContract.setKycCompleted(deployerAccount, {from: deployerAccount});
        let balanceBefore = await instanceToken.balanceOf(deployerAccount);
        await expect(instanceTokenSale.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "Wei")})).to.eventually.be.fulfilled;
        return await expect(instanceToken.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore + new BN(1));
    })

});