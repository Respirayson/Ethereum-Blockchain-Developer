var ItemManager = artifacts.require("./itemManager.sol");

contract("ItemManager", accounts => {
    it("... should let you create new Items.", async function() {
        const itemManagerInstance = await ItemManager.deployed();
        const itemName = "test1"
        const cost = 500;

        const result = await itemManagerInstance.createItem(itemName, cost, { from: accounts[0]});
        console.log(result)

        assert.equal(result.logs[0].args._itemIndex, 0, "One item index only");
        
        const item = await itemManagerInstance.items(0);
        assert.equal(item._identifier, itemName, "The item has a different identifier");
    });
})