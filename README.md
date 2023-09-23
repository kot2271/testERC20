# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# ERC20 Token Example

## Install
rm -rf node_modules/
npm cache clean     *** возможно будет ошибка, тогда пропустить этот шаг
npm install

## Deploy
Deploy contract to the chain (polygon-mumbai testnet)
```shell
npx hardhat run scripts/deploy.ts --network polygon-mumbai
```

## Tasks
Create a new task(s) and save it(them) in the folder "tasks". Add a new task_name in the file "tasks/index.ts"

Running a mint task:
```shell
npx hardhat mint --user {OWNER_ADDRESS} --amount 1230000000000000000 --token {TOKEN_ADDRESS} --network polygon-mumbai
```

Running a approve task:
```shell
npx hardhat approve --token {TOKEN_ADDRESS} --spender {USER_ADDRESS} --amount 1500000000000000000 --network polygon-mumbai
```

Running a transferFrom task:
```shell
npx hardhat transferFrom --token {TOKEN_ADDRESS} --from {USER_ADDRESS} --to {USER2_ADDRESS} --amount 1500000000000000000 --network polygon-mumbai
```

Running a transfer task:
```shell
npx hardhat transfer --token {TOKEN_ADDRESS} --address {USER_ADDRESS} --amount 1000000000000000000 --network polygon-mumbai
```

Running a burn task:
```shell
npx hardhat burn --token {TOKEN_ADDRESS} --amount 1800000000000000000 --network polygon-mumbai
```

## Verify
Verify the installation by running the following command:
```shell
npx hardhat verify --network polygon-mumbai {TOKEN_ADDRESS} "MyToken" "MTK"
```

```shell
MyToken contract deployed to: 0x462cEF234707C9a4Bd9149dF47Df48344773B14F
{OWNER_ADDRESS} : 0x28217F6A9AeBa48042E814e9fa8004Ecf5f90873
{USER_ADDRESS} : 0x70B90803dBE336f42FF0b83a8b3D2Ee8a9DE9d0C
```
