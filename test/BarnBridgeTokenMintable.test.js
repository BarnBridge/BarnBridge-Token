const { expect, use } = require('chai')
const { ethers } = require('@nomiclabs/buidler')
const { BigNumber } = require('bignumber.js')

use(require('chai-bignumber')())

describe('BarnBridgeTokenMintable', function () {
    let token

    const tokenName = 'BarnBridge Governance Token'
    const tokenSymbol = 'BOND'
    const mintTokens = new BigNumber(10000000 * Math.pow(10, 18))

    beforeEach(async function () {
        const accounts = await ethers.getSigners()
        owner = accounts[0]

        const Token = await ethers.getContractFactory('BarnBridgeTokenMintable')
        token = await Token.deploy()
        await token.deployed()
    })

    it('Deploys successfully', async function () {
        expect(token.address).to.not.equal(0)
    })

    it('Has correct name', async function () {
        expect(await token.name()).to.equal(tokenName)
    })

    it('Has correct symbol', async function () {
        expect(await token.symbol()).to.equal(tokenSymbol)
    })

    it('Mints 10MM tokens', async function () {
        const [owner] = await ethers.getSigners();

        await token.mint(await owner.getAddress(), mintTokens)

        const actual = new BigNumber((await token.totalSupply()).toString())

        expect(actual).to.be.bignumber.equal(mintTokens)
    })

    // it('Sends the initial minted tokens to aragon depositor', async function () {
    //     expect(
    //         new BigNumber(
    //             (await token.balanceOf(await aragonDepositor.getAddress())).toString(),
    //         ),
    //     ).to.be.bignumber.equal(mintTokens)
    // })
})
