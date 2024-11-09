// backend/scripts/deploy.js
async function main() {
    const MerkleProofVerifier = await ethers.getContractFactory("MerkleProofVerifier");
    const verifier = await MerkleProofVerifier.deploy();
    await verifier.deployed();
    console.log("MerkleProofVerifier deployed to:", verifier.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  