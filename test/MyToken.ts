import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";

const DECIMALS = 18;
const STRING_DECIMALS = DECIMALS.toString()
const NAME = "MyToken";
const SYMBOL = "MTK";
const INITIAL_AMOUNT: BigNumber = ethers.utils.parseUnits("10", "18"); // 10^18
// const bigNumberExample = BigNumber.from(1000);

describe("MyToken contract", function () {
  let MyToken;
  let myToken: Contract;
  let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, users: SignerWithAddress[];

  beforeEach(async () => {
    MyToken = await ethers.getContractFactory('MyToken');
    [owner, user1, user2, ...users] = await ethers.getSigners();
    myToken = await MyToken.deploy(NAME, SYMBOL);
  })

  describe("Initial params of contract", async () => {

    it("Initializes name, symbol and decimals correctly", async () => {
      expect(await myToken.name()).to.equal(NAME);
      expect(await myToken.symbol()).to.equal(SYMBOL);
      expect(await myToken.decimals()).to.equal(DECIMALS);
      });

    it("should have the correct owner", async () => {
      expect(await myToken.owner()).to.equal(owner.address);
      });
     
    it("should have the correct initial total supply", async () => {
      expect(await myToken.totalSupply()).to.equal(INITIAL_AMOUNT);
      });

      it("should have the correct initial balance for the owner", async () => {
        expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_AMOUNT);
        });
  });

  describe("Contract logic", function () {

    describe("mint function", async () => {
      it("should allow the owner to mint tokens", async () => {
      const mintAmount = INITIAL_AMOUNT;
      await myToken.mint(owner.address, mintAmount);
      expect(await myToken.totalSupply()).to.equal(INITIAL_AMOUNT.add(mintAmount));
      });
   
      it("should not allow non-owners to mint tokens", async () => {
      expect(myToken.mint(user1.address, INITIAL_AMOUNT)).to.be.revertedWith("MyToken: you are not an owner");
      });
    });

    describe("burn function", async () => {
      it("should allow the owner to burn tokens", async () => {
      const burnAmount = ethers.utils.parseUnits("1", STRING_DECIMALS);
      await myToken.burn(burnAmount);
      expect(await myToken.totalSupply()).to.equal(INITIAL_AMOUNT.sub(burnAmount));
      });
   
      it("should not allow non-owners to burn tokens", async () => {
      const burnAmount = ethers.utils.parseUnits("1", STRING_DECIMALS);
      expect(myToken.burn(burnAmount)).to.be.revertedWith("MyToken: Insufficient balance");
      });
    });

    describe("transfer function", async () => {
        it("should allow users to transfer tokens to other users", async () => {
        const transferAmount = ethers.utils.parseUnits("1", STRING_DECIMALS);
        await myToken.transfer(user1.address, transferAmount);
        expect(await myToken.balanceOf(user1.address)).to.equal(transferAmount);
        });
        
        it("should not allow users to transfer tokens if they do not have enough balance", async () => {
        const transferAmount = ethers.utils.parseUnits("100", STRING_DECIMALS);
        expect(myToken.transfer(user1.address, transferAmount)).to.be.revertedWith("MyToken: Not enough balance");
        });
    });

    describe("transferFrom function", async () => {
      it("should not allow users to transfer more tokens than approved", async () => {
          const senderBalanceBefore = await myToken.balanceOf(owner.address);
          const recipientBalanceBefore = await myToken.balanceOf(user1.address);
    
          expect(recipientBalanceBefore).to.equal(0);

          const transferAmount = ethers.utils.parseEther('2')
          await myToken.approve(owner.address, transferAmount);
          await myToken.transferFrom(owner.address, user1.address, transferAmount);

          const senderBalanceAfter = await myToken.balanceOf(owner.address);
          const recipientBalanceAfter = await myToken.balanceOf(user1.address);

          expect(senderBalanceAfter).to.equal(senderBalanceBefore.sub(transferAmount));
          expect(recipientBalanceAfter).to.equal(recipientBalanceBefore.add(transferAmount));
        });
          
        
      it("should not allow users to transfer tokens from other users if they have not been approved", async () => {
        const transferAmount = ethers.utils.parseUnits("1", STRING_DECIMALS);
        expect(myToken.transferFrom(owner.address, user2.address, transferAmount)).to.be.revertedWith("MyToken: Insufficient allowance");
        });
        
      it("should not allow users to transfer tokens from other users if the sender does not have enough balance", async () => {
        await myToken.approve(user1.address, INITIAL_AMOUNT);
        const transferAmount = ethers.utils.parseUnits("100", STRING_DECIMALS);
        expect(myToken.transferFrom(owner.address, user2.address, transferAmount)).to.be.revertedWith("MyToken: Insufficient balance");
        });
    });

    describe("approve function", async () => {
      it("should allow users to approve other users to spend their tokens", async () => {
        await myToken.approve(user1.address, INITIAL_AMOUNT);
        expect(await myToken.allowance(owner.address, user1.address)).to.equal(INITIAL_AMOUNT);
        });
        
      it("should not allow users to approve other users to spend more tokens than they have", async () => {
        const approveAmount = ethers.utils.parseUnits("100", STRING_DECIMALS);
        expect(myToken.approve(user1.address, approveAmount)).to.be.revertedWith("MyToken: Insufficient balance");
        });  
    });

    describe("allowance function", async () => {
      it("should return the amount of tokens that an owner has approved a spender to spend on their behalf", async () => {
        await myToken.approve(user1.address, INITIAL_AMOUNT);
        expect(await myToken.allowance(owner.address, user1.address)).to.equal(INITIAL_AMOUNT);
        });
    });
  });
});