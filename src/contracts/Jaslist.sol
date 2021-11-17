pragma solidity >=0.5.16 <0.9.0;

// update updateItemPrice to use verifyCaller as modifier
// if implementing ERC721 standard what functions will functions need to be omitted?
// how to remove item?
// need to declare state arrays?

contract Jaslist {

    // admin can open/close Jaslist; will receive unused eth if closed
    // address public admin;

    address owner;
    uint public itemCount; 

    mapping (uint => Item) public items;
    mapping (uint => address) itemToOwner; //maps item to owner
    // mapping (address => uint) ownerItemCount; //maps amount of items an owner has
    // mapping (address => User) users;

    // struct User {
    //     address userAddress,
    //     bool isSeller,
    //     bool exists
    // }
    
    struct Item {
        string name;
        string description;
        uint sku;
        uint price;
        address payable owner;
        bool purchased;
    }
    
    // User[] users;
    // Item[] items; // dynamic Array of Item struct ((Item[] public items;))// getter method is automatically created; other contracts can read from this array

    // enum State {
    //     ForSale,
    //     Sold,
    //     Transferred,
    //     Received,
    //     NotForSale
    // }

    // State public state;
    
    constructor() public {
        owner = msg.sender;
        itemCount = 0;
    }

    event LogItemAdded(
        string name,
        string description,
        uint sku,
        uint price,
        address payable owner,
        bool purchased
    );

    event LogItemSold(
        string name,
        string description,
        uint sku,
        uint price,
        address payable owner,
        bool purchased
    );

    // event LogItemTransferred(uint sku);
    // event LogItemReceived(uint sku);

    // modifier isOwner() {
    //     require(msg.sender == owner);
    //     _;
    // }

    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }
    
    // modifier forSale(uint _sku) {
    //     require(items[_sku].owner != address(0));
    //     require(items[_sku].state == State.ForSale, "Item is not for sale.");
    //     _;
    // }

    // modifier sold(uint _sku) {
    //     require(items[_sku].state == State.Sold, "Item has not been sold.");
    //     _;
    // }

    // modifier transferred(uint _sku) {
    //     require(items[_sku].state == State.Transferred, "Item has not yet been transferred.");
    //     _;
    // }

    // modifier checkValue(uint _sku) {
    //     _;
    //     uint _price = items[_sku].price;
    //     uint amountToRefund = msg.value - _price;
    //     items[_sku].buyer.transfer(amountToRefund);
    // }

    // modifier verifyCaller(address _address) {
    //     require(msg.sender == _address);
    //     _;
    // }

    // why does function need to return true?
    function addItem(string memory _name, string memory _description, uint _price) public returns (bool) {

        itemCount += 1;
        
        require(bytes(_name).length > 0);
        require(_price > 0);
        
        items[itemCount] = Item({
            name: _name,
            description: _description,
            sku: itemCount,
            price: _price,
            owner: msg.sender,
            purchased: false
        });
        
        emit LogItemAdded(_name, _description, items[itemCount].sku, _price, items[itemCount].owner, items[itemCount].purchased);

        return true;
    }
    
    
    // test this function; dapp university 1:08:54
    function buyItem(uint _sku) public payable paidEnough(items[_sku].price) {
        
        address payable _seller = items[_sku].owner;
        
        require(_sku >= 0 && _sku <= itemCount);
        require(items[_sku].purchased == false);
        require(_seller != msg.sender);
        
        _seller.transfer(items[_sku].price);

        items[_sku].owner = msg.sender;
        items[_sku].purchased = true;
        
        emit LogItemSold(items[_sku].name, items[_sku].description, items[_sku].sku, items[_sku].price, items[_sku].owner, items[_sku].purchased);
    }

    // function transferItem(uint _sku) public sold(_sku) {
    //     items[_sku].state = State.Transferred;

    //     emit LogItemTransferred(_sku);
    // }

    // function receiveItem(uint _sku) public transferred(_sku) {
    //     items[_sku].state = State.Received;

    //     emit LogItemReceived(_sku);
    // }

    function fetchItemName(uint _sku) public view returns (string memory name) {
        name = items[_sku].name;
        // description = items[_sku].description;
        // sku = items[_sku].sku;
        // price = items[_sku].price;
        // state = uint(items[_sku].state);
        // buyer = items[_sku].buyer;
        // seller = items[_sku].seller;
        
        return (name);
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

