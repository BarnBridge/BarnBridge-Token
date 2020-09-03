// SPDX-License-Identifier: ???
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "./IFinance.sol";

contract BarnBridgeToken is ERC20Burnable {
    uint256 constant private SUPPLY = 10000000 * 10**18;
    
    constructor(IFinance finance) public ERC20("BarnBridge Governance Token", "BOND") {
        _mint(address(this), SUPPLY);

        _approve(address(this), address(finance), SUPPLY);

        finance.deposit(address(this), SUPPLY, "BarnBridge Governance Token ($BOND) to be distributed according to https://client.aragon.org/#/barnbridgelaunch/0x0ee6df5b2482663f28e20c5927906724024121cc/vote/0/");
    }
}