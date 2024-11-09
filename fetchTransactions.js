const { Network, Alchemy } = require("alchemy-sdk");
const { MerkleTree } = require("merkletreejs");
const cryptoJS = require("crypto-js");  // Import the entire crypto-js module

const SHA256 = cryptoJS.SHA256;  // Get the SHA256 function from the module

// Setup Alchemy SDK
const settings = {
  apiKey: "DrfZS_M3Km7wZLhC5Wo8umKpVRV_NbI3", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Sepolia testnet
};

const alchemy = new Alchemy(settings);

// Fetch block transactions
async function fetchTransactions(blockNumber) {
  try {
    const block = await alchemy.core.getBlock(blockNumber, true); // `true` to get full block with transactions

    // Extract transaction hashes (Assuming block.transactions is an array of hashes)
    const txHashes = block.transactions;
    console.log("Transaction Hashes:", txHashes);

    // Create Merkle tree
    const leaves = txHashes.map(tx => SHA256(tx)); // Hash each transaction
    const tree = new MerkleTree(leaves, SHA256);
    const merkleRoot = tree.getRoot().toString('hex');
    console.log('Merkle Root:', merkleRoot);

    // Example: Select a transaction hash (first transaction in the array)
    const transactionHash = txHashes[0];
    console.log('Selected Transaction Hash:', transactionHash);

    // Generate Merkle proof for this transaction hash
    const leaf = SHA256(transactionHash); // Hash the selected transaction hash
    const proof = tree.getProof(leaf);
    console.log('Merkle Proof for Transaction Hash:', transactionHash);
    console.log(proof);

    // Verify the proof (optional, you can comment this out if you don't need verification)
    const isValid = tree.verify(proof, leaf, merkleRoot);
    console.log('Is the transaction valid?', isValid);
    //return { root, proof, proofTransaction: proofTransaction.toString('hex') };
    return { merkleRoot, proof ,proofTransaction:txHashes};  // Return the root and proof to use in other files
  } catch (error) {
    console.error("Error fetching block transactions:", error);
  }
}

// Example: Fetch transactions for a specific block (change block number as needed)
fetchTransactions(7040615);

module.exports = { fetchTransactions };  // Export the function to use in other files
