const { expect, use } = require("chai");
const { ethers } = require("@nomiclabs/buidler"); 
const {BigNumber} = require("bignumber.js");

use(require('chai-bignumber')());

describe("BarnBridgeToken", function() {
  let token;

  beforeEach(async function() {
    const Token = await ethers.getContractFactory("BarnBridgeToken")
    token = await Token.deploy()

    await token.deployed(); 
  })

  it('can deploy', async function() {
    expect(token.address).to.not.equal(0)
  })

  it("Has correct name", async function() {
    expect(await token.name()).to.equal("BarnBridge Governance Token")
  })

  it("Has correct symbol", async function() {
    expect(await token.symbol()).to.equal("BOND")
  })

  it("Mints 10MM tokens", async function() {
    let actual = new BigNumber((await token.totalSupply()).toString())
    let expected = new BigNumber('1e25');

    expect(actual).to.be.bignumber.equal(expected)
  })
});
