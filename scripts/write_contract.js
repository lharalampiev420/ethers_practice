import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config({ path: './../config.env' });

const INFURA_ID = process.env.INFURA_KOVAN_ID;
const provider = new ethers.providers.JsonRpcProvider(INFURA_ID);
const sender = '0x5E96fb96eE71911725A2C0B743Fa57990c27275C';
const recipient = '0x4281eCF07378Ee595C564a59048801330f3084eE'; // Random wallet
const contractAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'; // Chainlink contract address on kovan
const privateKey = process.env.PRIVATE_KEY;

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount) returns (bool)',
  'event Transfer(address indexed src, address indexed dst, uint val)',
];

const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
const sendingAmount = ethers.utils.parseUnits('0.1', 18);

const showBalances = async () => {
  const balanceSender = await contract.balanceOf(sender);
  const balanceRecipient = await contract.balanceOf(recipient);
  console.log(`Balance of sender: ${ethers.utils.formatEther(balanceSender)}`);
  console.log(
    `Balance of recipient: ${ethers.utils.formatEther(balanceRecipient)}\n`
  );
};

const main = async () => {
  await showBalances();

  const connectedWallet = contract.connect(wallet);
  const tx = await connectedWallet.transfer(recipient, sendingAmount);

  await tx.wait();
  console.log(tx);

  await showBalances();
};

main();
