// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  // const MYStableToken = await hre.ethers.getContractFactory("MYStableToken");
  // const mystableToken = await MYStableToken.deploy();  
  // await mystableToken.deployed();
  // console.log(
  //   `stable token on rinkeby deployed to ${mystableToken.address}`
  // );

  const PowerNFT = await hre.ethers.getContractFactory("PowerNFT");
  const powerNFT = await PowerNFT.deploy("0x4129cBDA42e6381A12e7F29638aee7cE2289a79D");

  await powerNFT.deployed();

  console.log(
    `powerNFT delployed deployed to ${powerNFT.address}`
  );

  // let tx = await mystableToken.approve(powerNFT.address, ethers.utils.parseEther("100000000000000000000000000000000000000000000000"))
  // tx.wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
