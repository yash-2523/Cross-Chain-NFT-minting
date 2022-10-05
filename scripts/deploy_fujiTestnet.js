// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const MYStableToken = await hre.ethers.getContractFactory("MYStableToken");
  const mystableToken = await MYStableToken.deploy();  
  await mystableToken.deployed();
  console.log(
    `stable token on fuji testnet deployed to ${mystableToken.address}`
  );

 

  const NFTMessenger = await hre.ethers.getContractFactory("NFTMessenger");
  const nftMessenger = await NFTMessenger.deploy("0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706", mystableToken.address);

  await nftMessenger.deployed();

  console.log(
    `nftMessenger delployed deployed to ${nftMessenger.address}`
  );

  let tx = await mystableToken.approve(nftMessenger.address, ethers.utils.parseEther("100000000000000000000000000000000000000000000000"))
  tx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
