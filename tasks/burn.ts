import { task } from "hardhat/config";
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task("burn", "Burn tokens")
.addParam("token", "Token address")
.addParam("amount", "Amount to burn")
.setAction(async ({token, amount}, { ethers }) => {
    const Token = await ethers.getContractFactory("MyToken");
    const tokenContract = Token.attach(token);

    const contractTx: ContractTransaction = await tokenContract.burn(amount);
    const contractReceipt: ContractReceipt = await contractTx.wait();
    const event = contractReceipt.events?.find(event => event.event === 'Transfer');
    const Burn_Initiator: Address = event?.args!['from'];
    const Zero_address: Address = event?.args!['to'];
    const eAmount: BigNumber = event?.args!['value'];            

    console.log(`Burn_Initiator: ${Burn_Initiator}`);
    console.log(`Zero_address: ${Zero_address}`);
    console.log(`Amount: ${eAmount}`);
    console.log(`Burned ${amount} MyToken's`);
});