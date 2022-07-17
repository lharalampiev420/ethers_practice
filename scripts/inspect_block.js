import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config({ path: './../config.env' });

const INFURA_ID = process.env.INFURA_MAINNET_ID;
const provider = new ethers.providers.JsonRpcProvider(INFURA_ID);

const main = async () => {
  const currentBlock = await provider.getBlockNumber();
  //console.log(`Block number: ${currentBlock}`);

  const blockInfo = await provider.getBlock(currentBlock);
  //console.log(blockInfo);

  const blockTransactions = await provider.getBlockWithTransactions(
    currentBlock
  );
  console.log(blockTransactions.transactions[0]);
};

main();
