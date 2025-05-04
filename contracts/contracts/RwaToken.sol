// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title DYT - Dubai Yield Token for RWA investments
contract DYT is ERC20 {
    constructor(address owner) ERC20("Dubai Yield Token", "DYT") {
        uint256 total = 1_000_000 ether;
        _mint(owner, total);
    }
} 