const { expect, use } = require("chai");
const { ethers } = require("@nomiclabs/buidler"); 
const {BigNumber} = require("bignumber.js");

use(require('chai-bignumber')());


describe("BarnBridgeToken", function() {
  it('can deploy', async function() {
    const Token = await ethers.getContractFactory("BarnBridgeToken")
    const token = await Token.deploy()

    await token.deployed(); 

    expect(token.address).to.not.equal(0)
  })

  it("Has correct name", async function() {
    const Token = await ethers.getContractFactory("BarnBridgeToken")
    const token = await Token.deploy()

    await token.deployed(); 

    expect(await token.name()).to.equal("BarnBridge Governance Token")
  })

  it("Has correct symbol", async function() {
    const Token = await ethers.getContractFactory("BarnBridgeToken")
    const token = await Token.deploy()

    await token.deployed(); 

    expect(await token.symbol()).to.equal("BOND")
  })

  it("Mints 10MM tokens", async function() {
    const Token = await ethers.getContractFactory("BarnBridgeToken")
    const token = await Token.deploy()

    await token.deployed(); 

    let x = new BigNumber('10000000000000000000000000');
-
    expect(await token.totalSupply()).to.be.bignumber.equal(x.toString())
  })
});
