import { task } from "hardhat/config";
import { BigNumber, ContractTransaction, ContractReceipt } from "ethers";
import { Address } from 'cluster';

task("approve", "Approve spender")
.addParam("token", "Token address")
.addParam("spender", "Spender address")
.addParam("amount", "Allowance amount")
.setAction(async ({token, spender, amount}, { ethers }) => {
    const Token = await ethers.getContractFactory("MyToken");
    const tokenContract = Token.attach(token);

    const contractTx: ContractTransaction = await tokenContract.approve(spender, amount);
    const contractReceipt: ContractReceipt = await contractTx.wait();
    const event = contractReceipt.events?.find(event => event.event === 'Approval');
    const Owner: Address = event?.args!['owner'];
    const Spender: Address = event?.args!['spender'];
    const Amount: BigNumber = event?.args!['value'];            

    console.log(`Owner: ${Owner}`);
    console.log(`Spender: ${Spender}`);
    console.log(`Amount: ${Amount}`);
    console.log(`Approved ${spender} to spend ${amount} MyToken's`);

});