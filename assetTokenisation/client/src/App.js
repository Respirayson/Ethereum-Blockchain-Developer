import React, { Component } from "react";
// import MyTokenContract from "./contracts/MyToken.json";
// import MyTokenSaleContract from "./contracts/MyTokenSale.json";
import MyMintedTokensale from "./contracts/MyMintedCrowdsale.json";
import MyMintedToken from "./contracts/MyMintedToken.json";
import MyKycContract from "./contracts/kycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x123...", TokenSaleAddress: null, userTokens: 0, totalSupply: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      // this.instanceToken = new this.web3.eth.Contract(
      //   MyTokenContract.abi,
      //   MyTokenContract.networks[this.networkId] && MyTokenContract.networks[this.networkId].address,
      // );

      // this.instanceTokenSale = new this.web3.eth.Contract(
      //   MyTokenSaleContract.abi,
      //   MyTokenSaleContract.networks[this.networkId] && MyTokenSaleContract.networks[this.networkId].address,
      // );

      this.instanceToken = new this.web3.eth.Contract(
        MyMintedToken.abi,
        MyMintedToken.networks[this.networkId] && MyMintedToken.networks[this.networkId].address,
      );

      this.instanceTokenSale = new this.web3.eth.Contract(
        MyMintedTokensale.abi,
        MyMintedTokensale.networks[this.networkId] && MyMintedTokensale.networks[this.networkId].address,
      );

      this.instanceKycContract = new this.web3.eth.Contract(
        MyKycContract.abi,
        MyKycContract.networks[this.networkId] && MyKycContract.networks[this.networkId].address,
      );

      // console.log(await this.instanceToken.methods.totalSupply().call());

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({ loaded: true, TokenSaleAddress: MyMintedTokensale.networks[this.networkId].address, totalSupply: await this.instanceToken.methods.totalSupply().call() }, this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name
    this.setState({
      [name] : value
    });
  }

  handleKycWhitelisting = async () => {
    await this.instanceKycContract.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC Whitelisting for " + this.state.kycAddress + " is completed")
  }

  updateUserTokens = async() => {
    let userTokens = await this.instanceToken.methods.balanceOf(this.accounts[0]).call();
    this.setState({
      userTokens: userTokens
    });
  }

  updateTotalSupply = async() => {
    let totalSupply = await this.instanceToken.methods.totalSupply().call();
    this.setState({
      totalSupply: totalSupply
    })
  }
  
  listenToTokenTransfer = () => {
    this.instanceToken.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
    this.instanceToken.events.Transfer({to: this.accounts[0]}).on("data", this.updateTotalSupply);
  }

  handleBuyTokens = async() => {
    await this.instanceTokenSale.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1", "wei")});
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>RAY Tokens Sale</h1>
        <p>Get your tokens from Rayson today</p>
        <h2>Know your Client Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange}></input>
        <button type="button" onClick={this.handleKycWhitelisting}>Add to KYC Whitelist</button>
        <h2>Buy Tokens</h2>
        <p>
          If you want to buy tokens, send Wei to this address: {this.state.TokenSaleAddress}
        </p>
        <p>You currently have: <b>{this.state.userTokens}</b> RAY Tokens</p>
        <button type="button" onClick={this.handleBuyTokens}>Buy more Tokens</button>
        <p>The total supply of RAY Tokens is currently: <b>{this.state.totalSupply}</b></p>
      </div>
    );
  }
}

export default App;
