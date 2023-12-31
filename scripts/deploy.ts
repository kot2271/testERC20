import { ethers, run, network } from "hardhat";

const delay = async (time: number) => {
  return new Promise((resolve: any) => {
    setInterval(() => {
      resolve()
    }, time)
  })
}

async function main() {
  const name = "MyToken";
  const symbol = "MTK";

  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(name, symbol);

  await myToken.deployed();

  console.log(`MyToken contract deployed to: ${myToken.address}`);
  console.log('Wait for delay...');
  await delay(1500); // 15 seconds
  console.log('Starting verify token...');

  try {
    await run('verify:verify', {
      address: myToken!.address,
      contract: './contracts/MyToken.sol:MyToken',
      constructorArguments: [ name, symbol ],
    });
    console.log('Verify success')
  } catch(e: any) {
    console.log(e.message)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
