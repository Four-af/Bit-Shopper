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
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
};
