## Lesson 1: Final Project Idea Exercise

# Problem
Second-hand ticket exchanges (for events, shows, etc.) are vulnerable to scams because the buyer or the seller is not a trusted source. Tickets need to be validated for their authenticity and promised that they aren't duplicated. Funds from the buyer need to be validated. 

# Solution
Dapp will allow buyers/sellers create a profile and can engage in transactions where the ticket and money exchange are verified on the blockchain.

# Project Requirements
Security: 
(1) No re-entrancy (https://solidity-by-example.org/hacks/re-entrancy/)
(2) Proper use of require

Design Patterns:
(1) Inherits Pausable from Open Zeppelin
(2) Restricts access to certain functions