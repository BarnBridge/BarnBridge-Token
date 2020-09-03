// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.6.0;

import "../IFinance.sol";

contract FinanceMock is IFinance {
    bool private _depositCalled = false;

    function deposit(address _token, uint256 _amount, string memory _reference) external override {
        _depositCalled = true;
        return;
    }

    function depositCalled() external view returns (bool) {
        return _depositCalled;
    }
}