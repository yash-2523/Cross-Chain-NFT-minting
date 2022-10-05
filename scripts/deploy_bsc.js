// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const NFTMessenger = await hre.ethers.getContractFactory("NFTMessenger");
  const nftMessenger = await NFTMessenger.deploy("0x3c2269811836af69497E5F486A85D7316753cf62", "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56");

  await nftMessenger.deployed();

  console.log(
    `nftMessenger delployed deployed to ${nftMessenger.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
