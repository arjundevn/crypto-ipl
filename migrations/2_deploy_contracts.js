const MGToken = artifacts.require("./MGToken.sol");
const MindGames = artifacts.require("./MindGames.sol");

const numberOfTokens = 2000;
// const numberOfTokensToContract  = 1500;

module.exports = async function(deployer) {

  await deployer.deploy(MGToken, numberOfTokens);
  const instanceMGToken = await MGToken.deployed();
  console.log("\n\nMGToken contract deployed at address: "+instanceMGToken.address);

  await deployer.deploy(MindGames, instanceMGToken.address);
  const instanceMindGames = await MindGames.deployed();
  console.log("\n\nMindGames contract deployed at address: "+instanceMindGames.address);

  // await instanceMGToken.setMGcontractAddress(instanceMindGames.address);

  // let passValue = numberOfTokensToContract.toString()+"000000000000000000";
  // await instanceMGToken.transfer(instanceMindGames.address, passValue);
  // console.log("\n\nTransfered "+numberOfTokensToContract+" to Mind games smart contract");
};
