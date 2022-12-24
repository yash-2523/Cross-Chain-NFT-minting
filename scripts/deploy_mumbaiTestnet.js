// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();

  const MYStableToken = await hre.ethers.getContractFactory("MYStableToken");
  const mystableToken = await MYStableToken.deploy();  
  await mystableToken.deployed();
  console.log(
    `stable token on polygon deployed to ${mystableToken.address}`
  );

  const PowerNFT = await hre.ethers.getContractFactory("PowerNFT");
  const powerNFT = await PowerNFT.deploy(mystableToken.address);

  await powerNFT.deployed();

  console.log(
    `powerNFT delployed deployed to ${powerNFT.address}`
  );  
  let tx = await mystableToken.approve(powerNFT.address, ethers.utils.parseEther("100000000000000000000000000000000000000000000000"))
  tx.wait()
  const NFTMessenger = await hre.ethers.getContractFactory("NFTMessenger");
  const nftMessenger = await NFTMessenger.deploy("0xf69186dfBa60DdB133E91E9A4B5673624293d8F8", mystableToken.address);

  await nftMessenger.deployed();

  console.log(
    `nftMessenger delployed deployed to ${nftMessenger.address}`
  );

  tx = await nftMessenger.setPowerNFTAddress(powerNFT.address)
  tx.wait()
  console.log("PowerNft set");
  
  tx = await powerNFT.ControlMinter(nftMessenger.address, true)
  tx.wait()
  console.log("Minter set");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
