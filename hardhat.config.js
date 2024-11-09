// backend/hardhat.config.js
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/DrfZS_M3Km7wZLhC5Wo8umKpVRV_NbI3",
      accounts: [""],  // Replace with your wallet private key
    },
  },
};
