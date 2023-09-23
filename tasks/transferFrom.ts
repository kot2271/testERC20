import { task } from "hardhat/config";
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task("transferFrom", "Transfer from allowed account")
.addParam("token", "Token address")
.addParam("from", "Owner address")
.addParam("to", "Recipient address")
.addParam("amount", "Transfer amount")
.setAction(async ({token, from, to, amount}, { ethers }) => {
    const Token = await ethers.getContractFactory("MyToken");
    const tokenContract = Token.attach(token);

    const contractTx: ContractTransaction = await tokenContract.transferFrom(from, to, amount);
    const contractReceipt: ContractReceipt = await contractTx.wait();
    const event = contractReceipt.events?.find(event => event.event === 'Transfer');
    const From: Address = event?.args!['from'];
    const To: Address = event?.args!['to'];
    const Amount: BigNumber = event?.args!['value'];            

    console.log(`Transfer from: ${From}`);
    console.log(`Transfer to: ${To}`);
    console.log(`Amount: ${Amount}`);
    console.log(`Transferred ${amount} MyToken's from ${from} to ${to}`);
});