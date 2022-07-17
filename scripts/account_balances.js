import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config({ path: './../config.env' });

const INFURA_ID = process.env.INFURA_MAINNET_ID;
const provider = new ethers.providers.JsonRpcProvider(INFURA_ID);
const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'; // Random wallet

const main = async () => {
  const balance = await provider.getBalance(address);

  console.log(
    `Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH`
  );
};

main();
