// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../CustomeContracts/ERC20.sol";

contract MYStableToken is ERC20 {
    constructor() ERC20("MyTokenname", "MyTokenSymbol") {
        _mint(msg.sender, 100000000000000000000000000000000000000000000000000000000000000000000000000000);
    }
}