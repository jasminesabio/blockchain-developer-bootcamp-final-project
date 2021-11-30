const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/abis"),
  networks: {
    develop: {
      host: 'localhost',
      port: 7545,
      network_id: '',
    },

    ganachecli: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },

  },

  compilers: {
    solc: {
      // default is 0.5.16
      version: ">=0.5.16 ^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    
      }
    }

  
};
