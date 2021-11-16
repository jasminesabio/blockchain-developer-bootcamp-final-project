pragma solidity >=0.5.16 <0.9.0;

// update updateItemPrice to use verifyCaller as modifier
// if implementing ERC721 standard what functions will functions need to be omitted?
// how to remove item?
// need to declare state arrays?

contract Jaslist {

    // admin can open/close Jaslist; will receive unused eth if closed
    // address public admin;

    address owner;
    uint public sku; 

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
        State state;
        address payable buyer;
        address payable seller;
        address owner;
    }
    
    // User[] users;
    // Item[] items; // dynamic Array of Item struct ((Item[] public items;))// getter method is automatically created; other contracts can read from this array

    enum State {
        ForSale,
        Sold,
        Transferred,
        Received,
        NotForSale
    }

    State public state;
    
    constructor() public {
        owner = msg.sender;
        sku = 0;
    }

    event LogItemAdded(uint sku);
    event LogItemSold(uint sku);
    event LogItemTransferred(uint sku);
    event LogItemReceived(uint sku);

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier forSale(uint _sku) {
        require(items[_sku].seller != address(0));
        require(items[_sku].state == State.ForSale, "Item is not for sale.");
        _;
    }

    modifier sold(uint _sku) {
        require(items[_sku].state == State.Sold, "Item has not been sold.");
        _;
    }

    modifier transferred(uint _sku) {
        require(items[_sku].state == State.Transferred, "Item has not yet been transferred.");
        _;
    }

    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }

    modifier checkValue(uint _sku) {
        _;
        uint _price = items[_sku].price;
        uint amountToRefund = msg.value - _price;
        items[_sku].buyer.transfer(amountToRefund);
    }

    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }
    
    // func addUser(address _userAddress) {
    //     msg.sender = _userAddress;
    //     users[_userAddress] = User(_userAddress, false, true);
    // }
    
    // func isSeller {
    //     // checks to see if user can receive payment
    // }

    // why does function need to return true?
    function addItem(string memory _name, string memory _description, uint _price) public returns (bool) {
        items[sku] = Item({
            name: _name,
            description: _description,
            sku: sku,
            price: _price,
            state: State.ForSale,
            buyer: address(0),
            seller: msg.sender,
            owner: msg.sender
        });

        sku++;
        emit LogItemAdded(sku);
        return true;
    }
    
    function buyItem(uint _sku) public payable forSale(_sku) paidEnough(items[_sku].price) checkValue(_sku) {
        items[_sku].buyer = msg.sender;
        items[_sku].state = State.Sold;
        items[_sku].seller.transfer(items[_sku].price);
        
        emit LogItemSold(_sku);
    }

    function transferItem(uint _sku) public sold(sku) verifyCaller(items[_sku].seller) {
        items[_sku].state = State.Transferred;

        emit LogItemTransferred(_sku);
    }

    function receiveItem(uint _sku) public transferred(_sku) verifyCaller(items[_sku].buyer) {
        items[_sku].state = State.Received;

        emit LogItemReceived(_sku);
    }

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

    function fetchItemPrice(uint _sku) public view returns (uint price) {
        // name = items[_sku].name;
        // description = items[_sku].description;
        // sku = items[_sku].sku;
        price = items[_sku].price;
        // state = uint(items[_sku].state);
        // buyer = items[_sku].buyer;
        // seller = items[_sku].seller;
        
        return (price);
    }

    function updateItemPrice(uint _sku, uint _price) public isOwner {
        items[_sku].price = _price;
    }

    function itemNotForSale(uint _sku) public {
        items[_sku].state = State.NotForSale;
    }

    // function getItemsByOwner {

    // }

}
