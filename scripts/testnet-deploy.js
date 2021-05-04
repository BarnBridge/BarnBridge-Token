const { ethers } = require('@nomiclabs/buidler')

async function main () {
    const Token = await ethers.getContractFactory('BarnBridgeTokenMintable')
    const token = await Token.deploy()
    await token.deployed()
    console.log('BarnBridgeToken deployed to:', token.address)

    const owner = '0xB011D306D36c396847bA42b1c7AEb8E96C540d9a'
    await token.mint(
        owner,
        ethers.BigNumber.from(10000000).mul(ethers.BigNumber.from(10).pow(18)),
    )
    console.log('Minted tokens')
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
