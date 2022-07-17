import ethers from 'ethers';
import dotenv from 'dotenv';
dotenv.config({ path: './../config.env' });

const INFURA_ID = process.env.INFURA_KOVAN_ID;
const provider = new ethers.providers.JsonRpcProvider(INFURA_ID);
const sender = '0x5E96fb96eE71911725A2C0B743Fa57990c27275C';
const recipient = '0x29D76BD42064bD6f6e07275a6Fe9DA456807466D'; // Random address
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

const main = async () => {
  // Show sender and recipient balances BEFORE
  const senderBalBefore = await provider.getBalance(sender);
  const recipientBalBefore = await provider.getBalance(recipient);

  console.log(
    `Sender balance before: ${ethers.utils.formatEther(senderBalBefore)}`
  );
  console.log(
    `Recipient balance before: ${ethers.utils.formatEther(recipientBalBefore)}`
  );

  // Send ether
  const transact = await wallet.sendTransaction({
    to: recipient,
    value: ethers.utils.parseEther('0.01'),
  });

  // Observe transaction
  await transact.wait();
  console.log(transact);

  // Show sender and recipient balances AFTER
  const senderBalAfter = await provider.getBalance(sender);
  const recipientBalAfter = await provider.getBalance(recipient);

  console.log(
    `Sender balance after: ${ethers.utils.formatEther(senderBalAfter)}`
  );
  console.log(
    `Recipient balance after: ${ethers.utils.formatEther(recipientBalAfter)}`
  );
};

main();
