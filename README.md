# Soulbound Grade

Soulbound Grade is a demo project that uses soulbound NFTs to grade students. It is a simple example of how to use the soulbound NFTs in a real-world scenario.

## Table of Contents

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/cicciord/soulbound-grade.git
   ```

2. Start a local blockchain and deploy the contracts

   `cd` into the `soulbound-grade-contracts` directory

   ```sh
   npm install
   ```

   ```sh
   npx hardhat node
   ```

   ```sh
   npx hardhat ignition deploy ./ignition/modules/SoulboundGrade.ts --network localhost
   ```

3. Start the frontend
   `cd` into the `soulbound-grade-frontend` directory

   Copy the `.env.example` file to `.env` and update the `NEXT_WC_PROJECT_ID` with your project ID. You can get one [here](https://cloud.walletconnect.com/)

   ```sh
   cp .env.example .env.local
   ```

   ```sh
   npm install
   ```

   ```sh
   npm run dev
   ```

## Usage

1. Navigate to `http://localhost:3000` in your browser

2. Import the **Account #0** from hardhat into your wallet (this is the owner of the contract and can assign new grades)

3. Connect your wallet

4. If your connected account is the owner, you will be able to see a form to assign a grade to a student. If you are not the owner, you will see a form to query the grade of a student.
