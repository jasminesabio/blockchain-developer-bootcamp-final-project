// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Jaslist is Pausable, Ownable {

    // address owner;
    uint public itemCount;
    bool internal locked;

    mapping (uint => Item) public items;
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
        // owner = msg.sender;
        itemCount = 0;
    }

    event LogItemAdded(
        string name,
        string description,
        uint sku,
        uint price,
        address payable itemOwner,
        bool purchased
    );

    event LogItemSold(
        string name,
        string description,
        uint sku,
        uint price,
        address payable itemOwner,
        bool purchased
    );

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }
    
    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }

    // modifier checkValue(uint _sku) {
    //     _;
    //     uint _price = items[_sku].price;
    //     uint amountToRefund = msg.value - _price;
    //     items[_sku].buyer.transfer(amountToRefund);
    // }

    // why does function need to return true?
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
    
    function buyItem(uint _sku) public payable paidEnough(items[_sku].price) noReentrant() whenNotPaused() {
        
        address payable _seller = items[_sku].itemOwner;
        
        require(_sku >= 0 && _sku <= itemCount);
        require(items[_sku].purchased == false);
        require(_seller != msg.sender);
        
        _seller.transfer(items[_sku].price);

        items[_sku].itemOwner = payable(msg.sender);
        items[_sku].purchased = true;
        
        emit LogItemSold(items[_sku].name, items[_sku].description, items[_sku].sku, items[_sku].price, items[_sku].itemOwner, items[_sku].purchased);
    }

    function pauseTransactions() private onlyOwner() {
        _pause();
    }

    function removeItem(uint _sku) public {
        require(items[_sku].itemOwner == msg.sender);
        delete items[_sku];
        items[_sku].name = "ticket unavailable";
    }

    // function updateItemPrice(uint _sku, uint _price) public isOwner {
    //     items[_sku].price = _price;
    // }

    // function itemNotForSale(uint _sku) public {
    //     items[_sku].state = State.NotForSale;
    // }

    // function getItemsByOwner {

    // }

}

