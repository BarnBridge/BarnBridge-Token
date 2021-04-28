// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BarnBridgeTokenMintable is ERC20Burnable, Ownable {
    constructor() 
        public         
        ERC20(
            "BarnBridge Governance Token",
            "BOND"
        )
    {}

    function mint(address to, uint256 amount) public onlyOwner virtual {
        _mint(to, amount);
    }
}
