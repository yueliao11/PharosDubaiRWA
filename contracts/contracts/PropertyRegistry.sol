// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PropertyRegistry
 * @notice Manages tokenised RWA assets: user balances, staking, yield, early cash-out, redemption.
 *         ⚠️  Simplified demo – NOT production ready.
 */
contract PropertyRegistry is Ownable {
    IERC20 public immutable rwa;

    struct AssetMeta {
        uint256 maturityTimestamp;   // unix secs
        uint256 discountRate;        // % eg 5 means 5%
        uint256 redemptionRate;      // % eg 100 means 1:1
    }

    // assetId => meta
    mapping(string => AssetMeta) public metas;

    // assetId => user => balances
    mapping(string => mapping(address => uint256)) public balances;
    mapping(string => mapping(address => uint256)) public staked;
    mapping(string => mapping(address => uint256)) public rewards;

    event AssetConfigured(string indexed assetId, uint256 maturity, uint256 discount, uint256 redemption);
    event Stake(string indexed assetId, address indexed user, uint256 amount);
    event Unstake(string indexed assetId, address indexed user, uint256 amount);
    event YieldClaimed(string indexed assetId, address indexed user, uint256 amount);
    event EarlyCashOut(string indexed assetId, address indexed user, uint256 tokens, uint256 stableOut);
    event Redeemed(string indexed assetId, address indexed user, uint256 tokens, uint256 stableOut);

    constructor(address _rwa) Ownable(msg.sender) {
        rwa = IERC20(_rwa);
    }

    /* ---------- admin ---------- */
    function configureAsset(string calldata assetId, uint256 maturity, uint256 discount, uint256 redemption) external onlyOwner {
        metas[assetId] = AssetMeta(maturity, discount, redemption);
        emit AssetConfigured(assetId, maturity, discount, redemption);
    }

    /* ---------- user actions ---------- */
    function stakeAsset(string calldata assetId, uint256 amount) external {
        require(amount > 0, "amount=0");
        rwa.transferFrom(msg.sender, address(this), amount);
        balances[assetId][msg.sender] += amount;
        staked[assetId][msg.sender] += amount;
        // naive: give 1% immediate reward for demo
        rewards[assetId][msg.sender] += amount / 100;
        emit Stake(assetId, msg.sender, amount);
    }

    function unstakeAsset(string calldata assetId, uint256 amount) external {
        require(amount > 0 && staked[assetId][msg.sender] >= amount, "bad amount");
        staked[assetId][msg.sender] -= amount;
        balances[assetId][msg.sender] -= amount;
        rwa.transfer(msg.sender, amount);
        emit Unstake(assetId, msg.sender, amount);
    }

    function claimAssetYield(string calldata assetId) external {
        uint256 reward = rewards[assetId][msg.sender];
        require(reward > 0, "no rewards");
        rewards[assetId][msg.sender] = 0;
        rwa.transfer(msg.sender, reward);
        emit YieldClaimed(assetId, msg.sender, reward);
    }

    // 用户提早折价套现 – 返回折扣后的稳定币数量（这里用 ETH 代替）
    function earlyCashOut(string calldata assetId, uint256 amount) external returns (uint256 stableOut) {
        AssetMeta memory m = metas[assetId];
        require(amount > 0 && balances[assetId][msg.sender] >= amount, "bad amount");
        uint256 discount = (amount * m.discountRate) / 100;
        stableOut = amount - discount;
        balances[assetId][msg.sender] -= amount;
        rwa.transfer(address(0xdead), amount); // burn tokens for demo
        payable(msg.sender).transfer(stableOut); // send ETH as mock stablecoin
        emit EarlyCashOut(assetId, msg.sender, amount, stableOut);
    }

    // 到期赎回
    function redeem(string calldata assetId, uint256 amount) external returns (uint256 stableOut) {
        AssetMeta memory m = metas[assetId];
        require(block.timestamp >= m.maturityTimestamp, "not matured");
        require(amount > 0 && balances[assetId][msg.sender] >= amount, "bad amount");
        stableOut = (amount * m.redemptionRate) / 100;
        balances[assetId][msg.sender] -= amount;
        rwa.transfer(address(0xdead), amount);
        payable(msg.sender).transfer(stableOut);
        emit Redeemed(assetId, msg.sender, amount, stableOut);
    }

    /* ---------- view ---------- */
    function getUserAssetBalance(string calldata assetId, address user) external view returns (uint256) {
        return balances[assetId][user];
    }
    function getStakedAssetBalance(string calldata assetId, address user) external view returns (uint256) {
        return staked[assetId][user];
    }
    function getAssetRewards(string calldata assetId, address user) external view returns (uint256) {
        return rewards[assetId][user];
    }
    function getAssetDetails(string calldata assetId) external view returns (
        uint256 totalSupply,
        uint256 tokenPrice,
        uint256 tokensSold,
        uint256 fundingGoal,
        bool isActive,
        uint256 maturity,
        uint256 discount,
        uint256 redemption
    ) {
        AssetMeta memory m = metas[assetId];
        return (0,0,0,0,true,m.maturityTimestamp,m.discountRate,m.redemptionRate);
    }

    // fallback to receive ETH/mock stablecoin
    receive() external payable {}
} 