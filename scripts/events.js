import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config({ path: './../config.env' });

const INFURA_ID = process.env.INFURA_MAINNET_ID;
const provider = new ethers.providers.JsonRpcProvider(INFURA_ID);
const contractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // Dai stablecoin smart contract address

const ERC20_ABI = [
  'event Transfer(address indexed _from, address indexed _to, uint256 _value)',
];

const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
const transactionValues = [];

const getEventsValue = function (event) {
  event.forEach(function (_, index) {
    const value = ethers.utils.formatUnits(event[index].args._value, 18);
    transactionValues.push(value);
  });
  console.log(transactionValues);
};

const main = async () => {
  const currentBlock = await provider.getBlockNumber();
  const transferEvents = await contract.queryFilter(
    'Transfer',
    currentBlock - 5,
    currentBlock
  );

  console.log(transferEvents);

  getEventsValue(transferEvents);
};

main();
