require("dotenv").config();
require('@nomiclabs/hardhat-waffle');

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/hOxeZ2bUy2bKVcPjPHum4XZlGCQT8r8k',
      accounts: ['0x80fae129bdfb2496b9a3c7ce5962225a2af710a6248533092041b5d720ae3f98']
    }
  },
};
