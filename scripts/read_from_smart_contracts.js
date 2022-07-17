import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config({ path: './../config.env' });

const INFURA_ID = process.env.INFURA_MAINNET_ID;
const provider = new ethers.providers.JsonRpcProvider(INFURA_ID);
const contract_address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // Dai stablecoin smart contract address
const holder_address = '0x38720d56899d46cad253d08f7cd6cc89d2c83190'; // Random wallet

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
];

const contract = new ethers.Contract(contract_address, ERC20_ABI, provider);

const main = async () => {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const balance = await contract.balanceOf(holder_address);

  console.log(`name: ${name}`);
  console.log(`symbol: ${symbol}`);
  console.log(`totalSupply: ${ethers.utils.formatEther(totalSupply)}`);
  console.log(`Balance of address: ${ethers.utils.formatEther(balance)}`);
};

main();
