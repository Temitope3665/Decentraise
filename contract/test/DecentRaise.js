const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DecentRaise", function () {

  async function deployDecentRaiseFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2] = await ethers.getSigners();
        
    let DecentRaise = await ethers.getContractFactory("DecentRaise");
    let decentRaise = await DecentRaise.deploy();
    return { decentRaise, owner, addr1, addr2 };
    }

  it("should create a campaign and contribute", async function () {
    const { decentRaise, owner, addr1 } = await loadFixture(deployDecentRaiseFixture);
    await decentRaise.connect(owner).createCampaign("Test Campaign", "Tagline", "Description", "Logo", "Cover", "ProjectLink", "Twitter", "DRNFT", 100, 7);
    await decentRaise.connect(addr1).contribute(0, { value: 50 });

    const campaign = await decentRaise.campaigns(0);
    expect(campaign.totalContributions).to.equal(50);
  });

  it("should allow user to create a campaign", async function () {
    const { decentRaise, owner} = await loadFixture(deployDecentRaiseFixture);
    await decentRaise.connect(owner).createCampaign("Test Campaign", "Tagline", "Description", "Logo", "Cover", "ProjectLink", "Twitter", "DRNFT", 100, 7);

    const campaign = await decentRaise.campaigns(0);
    expect(campaign.name).to.equal("Test Campaign");
  });

  it("should withdraw funds", async function () {
    const { decentRaise, owner, addr1 } = await loadFixture(deployDecentRaiseFixture);
    await decentRaise.connect(owner).createCampaign("Test Campaign", "Tagline", "Description", "Logo", "Cover", "ProjectLink", "Twitter", "DRNFT", ethers.parseEther("1"), 7);
    await decentRaise.connect(addr1).contribute(0, { value: ethers.parseEther("2") });
    await ethers.provider.send("evm_increaseTime", [864010]); // Move time forward by 10 day

    const addr1BalanceBefore = await ethers.provider.getBalance(addr1);
    await decentRaise.connect(addr1).withdrawFunds(0);

    const campaign = await decentRaise.campaigns(0);
    expect(campaign.isCampaignActive).to.equal(false);

    const addr1BalanceAfter = await ethers.provider.getBalance(addr1);
    expect(addr1BalanceAfter).to.be.gt(addr1BalanceBefore);
  });

  it("should get a refund", async function () {
    const { decentRaise, owner, addr1 } = await loadFixture(deployDecentRaiseFixture);
    await decentRaise.connect(owner).createCampaign("Test Campaign", "Tagline", "Description", "Logo", "Cover", "ProjectLink", "Twitter", "DRNFT", ethers.parseEther("2"), 7);
    await decentRaise.connect(addr1).contribute(0, { value: ethers.parseEther("1") });
    await ethers.provider.send("evm_increaseTime", [864010]); // Move time forward by 10 day

    const addr1BalanceBefore = await ethers.provider.getBalance(addr1);
    await decentRaise.connect(addr1).getRefund(0);

    const campaign = await decentRaise.campaigns(0);
    expect(campaign.isCampaignActive).to.equal(false);

    const addr1BalanceAfter = await ethers.provider.getBalance(addr1);
    expect(addr1BalanceAfter).to.be.gt(addr1BalanceBefore);
  });

  it("should prevent contribution after campaign ends", async function () {
    const { decentRaise, owner, addr1 } = await loadFixture(deployDecentRaiseFixture);
    await decentRaise.connect(owner).createCampaign("Test Campaign", "Tagline", "Description", "Logo", "Cover", "ProjectLink", "Twitter", "DRNFT", 100, 7);
    await ethers.provider.send("evm_increaseTime", [864010]); // Move time forward by 10 day

    await expect(decentRaise.connect(addr1).contribute(0, { value: 50 }))
      .to.be.revertedWith("Campaign is not active");
  });

  it("should prevent withdrawal of from an active campaign", async function () {
    const { decentRaise, owner, addr1 } = await loadFixture(deployDecentRaiseFixture);
    await decentRaise.connect(owner).createCampaign("Test Campaign", "Tagline", "Description", "Logo", "Cover", "ProjectLink", "Twitter", "DRNFT", 100, 7);
    await decentRaise.connect(addr1).contribute(0, { value: 50 });

    await expect(decentRaise.connect(addr1).withdrawFunds(0))
      .to.be.revertedWith("Campaign is still active");
  });

});
