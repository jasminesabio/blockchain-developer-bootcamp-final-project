# Jaslist Ticket Marketplace dApp

## Overview
### Problem
Second-hand ticket exchanges (for concerts, events, shows, etc.) are vulnerable to scams because the buyer or the seller is not a trusted source. Tickets need to be validated for their authenticity and promised that they aren't duplicated. Funds from the buyer need to be validated. 

### Solution
Jaslist Ticket Marketplace dApp will allow users to buy or sell tickets and can engage in transactions where the ticket and money exchange are verified on the blockchain.

### Live dApp Deployed on Rinkeby
[Jaslist](https://jaslist.netlify.app/)

Requirements: Metamask browser extension installed and connected to the Rinkeby Test Network

### dApp Walkthrough

## Installing dApp Locally
[Jaslist Github Repo](https://github.com/jasminesabio/blockchain-developer-bootcamp-final-project)

## Development Environment Set Up to Run Project Locally (macOS or Linux System)
1. Download a Code Editor (Visual Studio Code, Sublime, etc)
2. Install Homebrew\
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
3. Install [Node](https://nodejs.org/en/)
4. Install Git\
`brew install git`
5. Install Truffle\
`npm install -g truffle`
6. Download [Ganache GUI](https://www.trufflesuite.com/ganache)

### Running the Project Locally
In the terminal, clone the project repository/
`git clone https://github.com/jasminesabio/blockchain-developer-bootcamp-final-project`

In the terminal in the root directory of the project, install the dependecies/
`npm install`

Set up a local blockchain by opening up Ganache and quickstart a blockchain. In the terminal, run/
`truffle compile`
`truffle migrate`

To run the javascript tests, run/
`truffle test`

## Next Steps