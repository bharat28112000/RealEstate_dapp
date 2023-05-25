
# Real Estate NFT MarketPlace

The Real Estate Marketplace is a decentralized application (DApp) built on the Ethereum blockchain. It allows users to buy and sell real estate properties represented as non-fungible tokens (NFTs). The project is implemented using the Solidity programming language and OpenZeppelin library.

### Features
- Property Creation: Sellers can create NFTs representing their real estate properties, providing details such as the property name, description, and price.
- Property Listing: Sellers can list their properties for sale, specifying the sale price.
- Property Purchase: Buyers can purchase properties by paying the specified sale price in Ether (ETH).
- Ownership History: The contract maintains a transparent ownership history for each property, recording the address of each previous owner.

### Getting Started
Two use the Real Estate NFT MarketPlace DApp locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/bharat28112000/RealEstate_dapp.git

2. Install the necessary dependencies:

    ```
    npm install

3. Deploy the smart contract to your local Ethereum development network, such as Ganache. Update the network configuration in the truffle-config.js file if needed.

    ```
    truffle migrate --reset

4. Start the front-end development server:
    ```
    npm start ./client
    ```


### Usage

1. Connect your Ethereum wallet to the DApp.

2. Create a new property by providing the name, description, and price.

3. List the property for sale by specifying the sale price.
    
4. Buyers can view the listed properties and purchase them by paying the specified sale price.
    
5.  The ownership history for each property can be viewed to see the previous owners.


### Project Structure

- contracts: Contains the Solidity smart contract files.
- migrations: Contains the deployment scripts for deploying the smart contracts.
- client: Contains the front-end code and assets for the DApp.
- build/contracts: Contains the ABIs and addresses of the deployed contracts.

### Dependencies

    Solidity: Smart contract programming language.
    OpenZeppelin: Library for secure smart contract development.
    Truffle: Development framework for Ethereum.
    ethers.js: Ethereum JavaScript API.
    Ganache: Local Ethereum development network.


