const { expect, use } = require("chai");
const { ethers } = require("@nomiclabs/buidler"); 
const {BigNumber} = require("bignumber.js");

use(require('chai-bignumber')());

describe("BarnBridgeToken", function() {
  let token;
  let financeMock;

  beforeEach(async function() {
    const Token = await ethers.getContractFactory("BarnBridgeToken")
    const FinanceMock = await ethers.getContractFactory("FinanceMock")

    financeMock = await FinanceMock.deploy()
    await financeMock.deployed()

    token = await Token.deploy(financeMock.address)
    await token.deployed(); 
  })

  it('Can deploy successfully', async function() {
    expect(token.address).to.not.equal(0)
  })

  it("Has correct name", async function() {
    expect(await token.name()).to.equal("BarnBridge Governance Token")
  })

  it("Has correct symbol", async function() {
    expect(await token.symbol()).to.equal("BOND")
  })

  it("Mints 10MM tokens", async function() {
    let actual = new BigNumber((await token.totalSupply()).toString());
    let expected = new BigNumber('10000000').times(new BigNumber('10').pow(18));

    expect(actual).to.be.bignumber.equal(expected)
  })

  it("Approves Finance contract", async function() {
    let actual = new BigNumber((await token.allowance(token.address, financeMock.address)).toString())
    let expected = new BigNumber('10000000').times(new BigNumber('10').pow(18));

    expect(actual).to.be.bignumber.equal(expected)
  }); 


  it("Calls Finance.deposit", async function() {
    expect(await financeMock.depositCalled()).to.be.true
  })
});
