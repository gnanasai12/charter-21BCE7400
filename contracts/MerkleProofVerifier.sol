// contracts/MerkleProofVerifier.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleProofVerifier is Ownable {
    bytes32 public merkleRoot;

    constructor() Ownable(msg.sender) {
        // You can add any other initialization here if necessary
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function verifyTransaction(bytes32 leaf, bytes32[] calldata proof) external view returns (bool) {
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }
}
