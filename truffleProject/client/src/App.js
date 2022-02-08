import React, { Component } from "react";
import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json"
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {cost: 0, itemName: "exampleItem1", loaded: false};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.ItemManager = new this.web3.eth.Contract(
        ItemManagerContract.abi,
        ItemManagerContract.networks[this.networkId] && ItemManagerContract.networks[this.networkId].address,
      );

      this.Item = new this.web3.eth.Contract(
        ItemContract.abi,
        ItemContract.networks[this.networkId] && ItemContract.networks[this.networkId].address,
      );
      this.listenToPaymentEvent();
      this.setState({loaded: true});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleSubmit = async () => {
    const { cost, itemName } = this.state;
    console.log(itemName, cost, this.ItemManager);
    var result = await this.ItemManager.methods.createItem(itemName, cost).send({ from:this.accounts[0] });
    console.log(result);
    alert("Send " + cost + "Wei to " + result.events.SupplyChainStep.returnValues._address);
  };

  listenToPaymentEvent = () => {
    let self = this;
    this.ItemManager.events.SupplyChainStep().on("data", async function(evt) {
      console.log(evt);
      if (evt.returnValues._step == "1") {
        let itemObj = await self.ItemManager.methods.items(evt.returnValues._itemIndex).call();
        console.log(itemObj);
        alert("Payment has been made for " + itemObj._identifier + ", please make delivery now");
      }
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Supply Chain Example</h1>
        <p>Your Supply Chain is installed and ready.</p>
        <h2>Items</h2>
        
        <h2>Add Element</h2>
        Cost: <input type="text" name="cost" value={this.state.cost} onChange={this.handleInputChange} />
        Item Name: <input type="text" name="itemName" value={this.state.itemName} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleSubmit}>Create new Item</button>
      </div>
    );
  }
}

export default App;
