require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [`0x${process.env.WALLET_KEY}`],
    },
    arbitrumGoerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      chainId: 421613,
      accounts: [process.env.WALLET_KEY],
    },
    goerli: {
      url: "https://eth-goerli.public.blastapi.io",
      accounts: [process.env.WALLET_KEY],
    },
  },
  etherscan: {
    apiKey: {
      avalancheFuji: process.env.SNOTRACE_API_KEY,
      arbitrumGoerli: process.env.ARBISCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
    },
  },
};
