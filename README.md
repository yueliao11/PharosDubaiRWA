# Pharos Dubai RWA

![Pharos Dubai RWA](https://place-hold.it/800x400?text=Pharos%20Dubai%20RWA&fontsize=30)

## Overview

Pharos Dubai RWA is an innovative blockchain platform deeply integrated with the Pharos ecosystem that tokenizes premium Dubai real estate assets. The platform follows Pharos' three-layer architecture to fractionate real estate into digital tokens, significantly lowering investment barriers while enhancing liquidity. Investors worldwide can access Dubai's lucrative property market with smaller capital requirements, manage their portfolios efficiently, and benefit from rental yields through a transparent blockchain-based system.

## Features

- **Property Tokenization**: Convert Dubai premium properties into digital tokens
- **Portfolio Management**: Track investments, performance, and yields
- **Asset Liquidity**: Secondary market for token trading
- **Staking & Yield**: Stake assets to earn additional returns
- **Market Insights**: Access Dubai real estate market analytics and trends

## Technology Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Blockchain Integration**: RainbowKit, wagmi, viem
- **Smart Contracts**: Solidity, Hardhat
- **Authentication**: Web3 wallet connection
- **Data Visualization**: Recharts

## Pharos Ecosystem Integration

- Integrated with Pharos KYC/AML services
- Connected to Pharos smart wallets and cross-chain bridges
- Leverages Pharos oracles for real estate market data
- Utilizes Pharos fiat/token exchange channels

## Installation

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Metamask or other Web3 wallet

### Setup Frontend

1. Clone the repository:
```bash
git clone https://github.com/your-repo/PharosDubaiRWA.git
cd PharosDubaiRWA
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env.local` file with required environment variables:
```
NEXT_PUBLIC_INFURA_ID=your_infura_id
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Smart Contract Deployment

1. Navigate to the contracts directory:
```bash
cd contracts
```

2. Install contract dependencies:
```bash
pnpm install
```

3. Create `.env` file with deployment keys:
```
PRIVATE_KEY=your_private_key
INFURA_API_KEY=your_infura_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

4. Compile contracts:
```bash
npx hardhat compile
```

5. Deploy to testnet:
```bash
npx hardhat run scripts/deploy.js --network goerli
```

## Project Structure

```
PharosDubaiRWA/
├── app/                   # Next.js pages and routes
├── components/            # React components
├── contracts/             # Smart contracts and deployment scripts
├── hooks/                 # React hooks
├── lib/                   # Utilities and helpers
├── public/                # Static files
├── .next/                 # Next.js build output
├── node_modules/          # Project dependencies
├── README.md              # This file
├── package.json           # Project configuration
└── next.config.js         # Next.js configuration
```

## Usage

1. Connect your wallet through the platform
2. Browse available properties
3. Purchase tokens of your chosen property
4. Manage your portfolio through the dashboard
5. Stake tokens to earn additional yields
6. Trade tokens on the secondary market or redeem at maturity

## License

[MIT License](LICENSE)

## Contact

For inquiries, please contact: team@pharosdubairwa.com 