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

    it('Owner mints tokens', async function () {
        const [owner, user] = await ethers.getSigners();
        ownerAddress = await owner.getAddress()
        userAddress = await user.getAddress()

        await token.mint(ownerAddress, mintTokens)

        const ownerBalance = await token.balanceOf(ownerAddress);
        expect(ownerBalance).to.equal(mintTokens);

        const totalSupply = await token.totalSupply()
        expect(totalSupply).to.be.equal(mintTokens)

        await token.mint(userAddress, mintTokens)

        const userBalance = await token.balanceOf(userAddress);
        expect(userBalance).to.equal(mintTokens);

        const totalSupply2 = await token.totalSupply()
        expect(totalSupply2).to.be.equal(mintTokens.mul(2))
    })

    it('Only owner can mint', async function () {
        const [owner, signer] = await ethers.getSigners();
        signerAddress = await signer.getAddress()

        await expect(token.connect(signer).mint(await signerAddress, mintTokens)).to.be.revertedWith("Ownable: caller is not the owner");

    })
})
