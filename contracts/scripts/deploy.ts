import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with", deployer.address);

  const DYT = await ethers.getContractFactory("DYT");
  const token = await DYT.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("DYT deployed:", tokenAddress);

  const Registry = await ethers.getContractFactory("PropertyRegistry");
  const registry = await Registry.deploy(tokenAddress);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("PropertyRegistry deployed:", registryAddress);

  // Example configure asset for testing
  const now = Math.floor(Date.now() / 1000);
  const oneYear = 365 * 24 * 60 * 60;
  await registry.configureAsset("asset-1", now + oneYear, 5, 100);
  console.log("Configured demo asset");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
}); 