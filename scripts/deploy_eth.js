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
  const PowerNFT = await hre.ethers.getContractFactory("PowerNFT");
  // const gasPrice = await PowerNFT.signer.getGasPrice();
  // console.log(`Current gas price: ${gasPrice}`);

  // const estimatedGas = await PowerNFT.signer.estimateGas(
  //   PowerNFT.getDeployTransaction("0xdAC17F958D2ee523a2206206994597C13D831ec7"),
  // );
  // console.log(`Estimated gas: ${estimatedGas}`);

  // const deploymentPrice = gasPrice.mul(estimatedGas);
  // const deployerBalance = await PowerNFT.signer.getBalance();
  // console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
  // console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
  // if (deployerBalance.lt(deploymentPrice)) {
  //   throw new Error(
  //     `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
  //       deploymentPrice.sub(deployerBalance),
  //     )}`,
  //   );
  // }
  
  const powerNFT = await PowerNFT.deploy("0xdAC17F958D2ee523a2206206994597C13D831ec7");

  await powerNFT.deployed();

  console.log(
    `powerNFT deployed to ${powerNFT.address}`
  );  
  // const NFTMessenger = await hre.ethers.getContractFactory("NFTMessenger");
  // const gasPrice = await NFTMessenger.signer.getGasPrice();
  // console.log(`Current gas price: ${gasPrice}`);

  // const estimatedGas = await NFTMessenger.signer.estimateGas(
  //   NFTMessenger.getDeployTransaction("0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675","0xdAC17F958D2ee523a2206206994597C13D831ec7"),
  // );
  // console.log(`Estimated gas: ${estimatedGas}`);

  // const deploymentPrice = gasPrice.mul(estimatedGas);
  // const deployerBalance = await NFTMessenger.signer.getBalance();
  // console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
  // console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
  // if (deployerBalance.lt(deploymentPrice)) {
  //   throw new Error(
  //     `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
  //       deploymentPrice.sub(deployerBalance),
  //     )}`,
  //   );
  // }
  // const nftMessenger = await NFTMessenger.deploy("0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675", "0xdAC17F958D2ee523a2206206994597C13D831ec7");

  // await nftMessenger.deployed();

  // console.log(
  //   `nftMessenger deployed to ${nftMessenger.address}`
  // );

  // tx = await nftMessenger.setPowerNFTAddress("0xaF4D168d62A953c57f15E44BcFcf37020Fc8A608")
  // tx.wait()
  // console.log("PowerNft set");
  
  // tx = await powerNFT.ControlMinter(nftMessenger.address, true)
  // tx.wait()
  // console.log("Minter set");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
