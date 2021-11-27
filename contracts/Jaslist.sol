/// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Marketplace for second hand ticket resale
/// @author Jasmine Sabio
/// @notice Allows a user to sell a ticket or to buy a ticket
/// @dev Functional calls are implemented without side effects. This contract in herits Open Zeppelin's Pausable and Ownable.
contract Jaslist is Pausable, Ownable {

    /// @dev Tracks total amount of items. itemCount is also used for item ID (sku).
    uint public itemCount;
    /// @dev Locks or unlocks account to pause account.
    bool internal locked;
    
    /// @dev Maps item number in item count to an item struct.
    mapping (uint => Item) public items;
    /// @dev Maps item number in item count to item owner.
    mapping (uint => address) itemToOwner;
    
    struct Item {
        string name;
        string description;
        uint sku;
        uint price;
        address payable itemOwner;
        bool purchased;
    }
    
    constructor() Pausable() Ownable() {
        itemCount = 0;
    }

    /// @notice Event emitted when an item is added
    /// @param _name Item name
    /// @param _description Item description (location, date)
    /// @param _sku Item ID (item count)
    /// @param _price Item price in ETH
    /// @param _itemOwner Item owner
    /// @param _purchased Is item purchased?
    event LogItemAdded(
        string _name,
        string _description,
        uint _sku,
        uint _price,
        address payable _itemOwner,
        bool _purchased
    );

    /// @notice Event emitted when an item is sold
    /// @param _name Item name
    /// @param _description Item description (location, date)
    /// @param _sku Item ID (item count)
    /// @param _price Item price in ETH
    /// @param _itemOwner Item owner
    /// @param _purchased Is item purchased?
    event LogItemSold(
        string _name,
        string _description,
        uint _sku,
        uint _price,
        address payable _itemOwner,
        bool _purchased
    );

    /// @dev Protects function when ETH is transferred from reentrancy attacks
    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
    
    /// @dev Checks if buyer has enough ETH before executing the buying function
    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }

    /// @dev Refunds excess ETH if buyer paid too much
    modifier checkValue(uint _sku) {
        _;
        uint _price = items[_sku].price;
        uint amountToRefund = msg.value - _price;
        address payable buyer = payable(msg.sender);
        buyer.transfer(amountToRefund);
    }

    /// @notice Adds item to contract state
    /// @param _name Item name
    /// @param _description Item description
    /// @param _price Item price in ETH
    function addItem(string memory _name, string memory _description, uint _price) public whenNotPaused() returns (bool) {

        itemCount += 1;
        
        require(bytes(_name).length > 0);
        require(_price > 0);
        
        items[itemCount] = Item({
            name: _name,
            description: _description,
            sku: itemCount,
            price: _price,
            itemOwner: payable(msg.sender),
            purchased: false
        });
        
        emit LogItemAdded(_name, _description, items[itemCount].sku, _price, items[itemCount].itemOwner, items[itemCount].purchased);

        return true;
    }
    
    /// @notice Buys item and ETH is transferred from the buyer to the seller
    /// @param _sku Item ID (item count)
    function buyItem(uint _sku) public payable paidEnough(items[_sku].price) checkValue(_sku) noReentrant() whenNotPaused() {
        
        address payable _seller = items[_sku].itemOwner;
        
        require(_sku >= 0 && _sku <= itemCount);
        require(items[_sku].purchased == false);
        require(_seller != msg.sender);
        
        _seller.transfer(items[_sku].price);

        items[_sku].itemOwner = payable(msg.sender);
        items[_sku].purchased = true;
        
        emit LogItemSold(items[_sku].name, items[_sku].description, items[_sku].sku, items[_sku].price, items[_sku].itemOwner, items[_sku].purchased);
    }

    /// @dev Pauses contract from further transaction; only executed by contract owner
    function pauseTransactions() private onlyOwner() {
        _pause();
    }

    /// @notice Ticket becomes unavaiable to be purchased
    /// @param _sku Item ID (item count)
    /// @dev Clears struct for item and ticket name is updated to "ticket unavailable" 
    function removeItem(uint _sku) public {
        require(items[_sku].itemOwner == msg.sender);
        delete items[_sku];
        items[_sku].name = "ticket unavailable";
    }

    /// @notice Updates a seller's item price
    /// @dev Only item owner can call this
    function updateItemPrice() public {
        // TODO: allows seller to update the price of their item
    }

    /// @notice Loads list of items the user owns
    function getItemsByOwner() public {
        // TODO: fetches list of items that the owner has
    }

}

