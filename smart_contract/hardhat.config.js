require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      // test network https key
      url: 'https://eth-goerli.g.alchemy.com/v2/oJkP9HjycNvuXdOw4iXuKpTC5L6yTQPR',
      // your account's private key
      accounts: ['683533ef663b1194efc15bdf1322dfec3804c88c25e0e5ad51fbfb4602b93b97'],
    },
  },
};
