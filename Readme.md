# BarnBridge Governance Token (BOND)
![](https://i.imgur.com/w9LQRuv.png)

[![Continuous Integration](https://github.com/BarnBridge/BarnBridge-Token/workflows/Continuous%20Integration/badge.svg)](https://github.com/BarnBridge/BarnBridge-Token/actions)

Deployed at [0x0391d2021f89dc339f60fff84546ea23e337750f](https://etherscan.io/token/0x0391d2021f89dc339f60fff84546ea23e337750f) with $BOND as its ticker symbol.

The below specification is from the detailed description of the token found in [BBIP-3](https://github.com/BarnBridge/BBIP/blob/master/bbips/003-BOND-Token.md), short for BarnBridge Improvement Proposal #3.

Interested in learning more about BarnBridge? Read our [Developer Guides](https://integrations.barnbridge.com/) for more information.

# Specification

One of the best ways to build ERC-20 contracts is to use the OpenZeppelin contracts. They are industry standard at this point and have been battle tested.

Our contract is inheriting the ERC20 contract and adding a bit of functionality on top.

### Define basic token parameters
The token parameters are:

- Name: BarnBridge Governance Token
- Symbol: BOND
- Decimals: 18
- Supply: 10,000,000 

The function of token minting is disabled. No additional minting is possible.

## Discussion
For any concerns with the platform, open an issue on GitHub or visit us on [Discord](https://discord.gg/9TTQNUzg) to discuss.
For security concerns, please email info@barnbridge.com.

Copyright 2021 BarnBridge DAO
