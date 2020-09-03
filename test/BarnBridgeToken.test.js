const { expect, use } = require('chai')
const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require('bignumber.js')

use(require('chai-bignumber')())

describe('BarnBridgeToken', function () {
    let token
    let financeMock
    const tokenName = 'BarnBridge Governance Token'
    const tokenSymbol = 'BOND'
    const mintTokens = new BigNumber(10000000 * Math.pow(10, 18))

    beforeEach(async function () {
        const Token = await ethers.getContractFactory('BarnBridgeToken')
        const FinanceMock = await ethers.getContractFactory('FinanceMock')

        financeMock = await FinanceMock.deploy()
        await financeMock.deployed()

        token = await Token.deploy(financeMock.address)
        await token.deployed()
    })

    it('Can deploy successfully', async function () {
        expect(token.address).to.not.equal(0)
    })

    it('Has correct name', async function () {
        expect(await token.name()).to.equal(tokenName)
    })

    it('Has correct symbol', async function () {
        expect(await token.symbol()).to.equal(tokenSymbol)
    })

    it('Mints 10MM tokens', async function () {
        const actual = new BigNumber((await token.totalSupply()).toString())

        expect(actual).to.be.bignumber.equal(mintTokens)
    })

    it('Approves Finance contract for the full amount of tokens', async function () {
        const actual = new BigNumber((await token.allowance(token.address, financeMock.address)).toString())

        expect(actual).to.be.bignumber.equal(mintTokens)
    })

    it('Calls Finance.deposit on deploy', async function () {
        expect(await financeMock.depositCalled()).to.be.true
    })
})
