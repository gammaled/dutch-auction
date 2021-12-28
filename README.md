# Dutch Auction

## Project Goal
---

* To write a smart contract that performs a dutch auction of digital assets, which in the case of this project will be NFTs (non-fungible tokens) which are tokens in the [ERC-721 standard](https://eips.ethereum.org/EIPS/eip-721).

    #### What is a dutch auction?
    * It is an auction where the auctioneer starts with a high asking price and it decreases until a participant accepts the price or it reaches a predetermined reserve price.<br>
<br>
* As soon as the bidder accepts the price, the asset should be immediately transferred to avoid a [flash loan attack](https://coinmarketcap.com/alexandria/article/what-are-flash-loan-attacks).
* The smart contract should be covered by unit tests to ensure that it works as intended before deployment to Ethereum mainnet.

## Technologies Used
---
* [Solidity](https://docs.soliditylang.org/en/v0.8.11/): writing smart contracts
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): writing scripts that deploy and interact with smart contract after it's deployed
* [Node.js](https://nodejs.org/en/docs/): installing and managing packages
* [Truffle](https://trufflesuite.com/): smart contract development framework
* [Mocha](https://mochajs.org/): Unit testing framework