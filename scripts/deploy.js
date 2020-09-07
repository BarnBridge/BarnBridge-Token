const { ethers } = require('@nomiclabs/buidler')

async function main () {
    // Deploy AragonDepositor
    const AragonDepositor = await ethers.getContractFactory('AragonDepositor')
    const aragonDepositor = await AragonDepositor.deploy()
    console.log('AragonDepositor deployed to:', aragonDepositor.address)

    // Deploy BarnBridge Governance Token
    // and give all tokens to AragonDepositor
    const Token = await ethers.getContractFactory('BarnBridgeToken')
    const token = await Token.deploy(aragonDepositor.address)
    await token.deployed()
    console.log('BarnBridgeToken deployed to:', token.address)

    // Run execute on AragonDepositor with
    // - Token address
    // - Finance address
    const finance = '0x3bc45731f72ecc4f41b864588d77f0852e2cf7e8'
    await aragonDepositor.execute(
        token.address,
        finance,
    )
    console.log('Executed deposit')
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
