// SPDX-License-Identifier: ???
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

// interface IFinance {
//     function deposit(address _token, uint256 _amount, string memory _reference) external
// }

contract BarnBridgeToken is ERC20Burnable {
    uint256 constant private SUPPLY = 10000000 * 10**18;
    // address constant private BarnBridgeFinance = 0x3bc45731f72eCc4F41B864588d77F0852e2CF7e8;
    
    constructor() public ERC20("BarnBridge Governance Token", "BOND") {
        _mint(address(this), SUPPLY);

        // approve(BarnBridgeFinance, SUPPLY);

        // finance.deposit(address(this), SUPPLY, "BarnBridge Governance Token ($BOND) to be distributed according to https://client.aragon.org/#/barnbridgelaunch/0x0ee6df5b2482663f28e20c5927906724024121cc/vote/0/");
    }
}