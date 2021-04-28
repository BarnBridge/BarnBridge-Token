const { expect, use } = require('chai')
const { ethers } = require('@nomiclabs/buidler')

describe('BarnBridgeTokenMintable', function () {
    let token

    const tokenName = 'BarnBridge Governance Token'
    const tokenSymbol = 'BOND'
    const mintTokens = ethers.BigNumber.from(10000000).mul(ethers.BigNumber.from(10).pow(18))

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

    it('Owner mints 10MM tokens', async function () {
        const [owner] = await ethers.getSigners();
        ownerAddress = await owner.getAddress()

        await token.mint(ownerAddress, mintTokens)

        const ownerBalance = await token.balanceOf(ownerAddress);
        expect(await token.totalSupply()).to.equal(ownerBalance);

        const actual = await token.totalSupply()
        expect(actual).to.be.equal(mintTokens)
    })

    it('Only owner can mint', async function () {
        const [owner, signer] = await ethers.getSigners();
        signerAddress = await signer.getAddress()

        await expect(token.connect(signer).mint(await signerAddress, mintTokens)).to.be.revertedWith("Ownable: caller is not the owner");

        // const actual = await token.totalSupply()
        // expect(actual).to.be.equal(mintTokens)
    })
    // it('Sends the initial minted tokens to aragon depositor', async function () {
    //     expect(
    //         new BigNumber(
    //             (await token.balanceOf(await aragonDepositor.getAddress())).toString(),
    //         ),
    //     ).to.be.bignumber.equal(mintTokens)
    // })
})
