const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider")
const accountIndex = 0;
require("dotenv").config({path: "./.env"});

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", accountIndex)
      },
      network_id: 5777
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/8f4559b8f32b4636978e992026b5dc84", accountIndex)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
