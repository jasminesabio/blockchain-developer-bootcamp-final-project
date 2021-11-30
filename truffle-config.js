const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545
    },

    ganachecli: {
      port: 8545
    }
  },

  compilers: {
    solc: {
      // default is 0.5.16
      version: ">=0.5.16 ^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    
      }
    }

  
};
