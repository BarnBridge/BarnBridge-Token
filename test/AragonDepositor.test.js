const { expect, use } = require('chai')
const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require('bignumber.js')

use(require('chai-bignumber')())

describe('AragonDepositor', function () {
    let aragonDepositor
    let token
    let financeMock

    const mintTokens = new BigNumber(10000000 * Math.pow(10, 18))

    beforeEach(async function () {
        const AragonDepositor = await ethers.getContractFactory('AragonDepositor')
        aragonDepositor = await AragonDepositor.deploy()

        const Token = await ethers.getContractFactory('BarnBridgeToken')
        token = await Token.deploy(aragonDepositor.address)
        await token.deployed()

        const FinanceMock = await ethers.getContractFactory('FinanceMock')
        financeMock = await FinanceMock.deploy()
        await financeMock.deployed()
    })

    it('Deploys successfully', async function () {
        expect(aragonDepositor.address).to.not.equal(0)
    })

    it('Approves Finance on execute', async function () {
        await aragonDepositor.execute(token.address, financeMock.address)

        const allowance = new BigNumber(
            (await token.allowance(aragonDepositor.address, financeMock.address)).toString(),
        )

        expect(allowance).to.be.bignumber.equal(mintTokens)
    })

    it('Calls Finance.deposit() on execute', async function () {
        await aragonDepositor.execute(token.address, financeMock.address)

        expect(await financeMock.depositCalled()).to.be.true
    })

    it('Selfdestructs after execute', async function () {
        await aragonDepositor.execute(token.address, financeMock.address)

        expect(await ethers.provider.getCode(aragonDepositor.address)).to.be.equal('0x')
    })
})
