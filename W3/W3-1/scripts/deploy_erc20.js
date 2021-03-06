const hre = require("hardhat");
const { writeAddr } = require('./artifact_log.js');

async function main() {
  // await hre.run('compile');
  const [deployer,deployer1] = await ethers.getSigners();
  console.log("Deployer Balance:", (await deployer.getBalance()).toString());

  const ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
  const token = await ERC20Token.deploy();

  await token.deployed();
  console.log("Deployer1 Balance:", (await token.balanceOf(deployer1.address)).toString());
  console.log("ERC20Token deployed to:", token.address);
  console.log("转账:", await token.transfer(deployer1.address,50));
  console.log("Deployer1 Balance:", (await token.balanceOf(deployer1.address)).toString());
  await writeAddr(token.address, "ERC20Token", network.name);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
