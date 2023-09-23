import { task } from "hardhat/config";
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task('transfer', 'Transfer tokens to the address')
.addParam('token', 'Token address')
.addParam('address', 'Recipient address')
.addParam('amount', 'Amount to transfer')
.setAction(async ({token, address, amount}, { ethers }) => {
    const Token = await ethers.getContractFactory("MyToken");
    const tokenContract = Token.attach(token);

    const contractTx: ContractTransaction = await tokenContract.transfer(address, amount);
    const contractReceipt: ContractReceipt = await contractTx.wait();
    const event = contractReceipt.events?.find(event => event.event === 'Transfer');
    const From: Address = event?.args!['from'];
    const To: Address = event?.args!['to'];
    const Amount: BigNumber = event?.args!['value'];            

    console.log(`From: ${From}`);
    console.log(`To: ${To}`);
    console.log(`Amount: ${Amount}`);
    console.log(`Transferred ${amount} MyToken's to ${address}`);

});