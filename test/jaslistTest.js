const Jaslist = artifacts.require("Jaslist");

contract('Jaslist', (accounts) => {

    let jaslist = null;
    const [seller, buyer] = accounts;
    // const [msg.owner, notOwner] = accounts;

    before(async() => {
        jaslist = await Jaslist.deployed();
    });

    it('should deploy smart contract properly', async () => {
        // console.log(jaslist.address);
        assert(jaslist.address !== '');
    });

    it('should add item', async () => {
        await jaslist.addItem("test", "test description", 1);
        const item = await jaslist.fetchItemName(0); 
        assert(item === "test");
    });

    it('should update price', async () => {
        await jaslist.addItem("test1", "test description1", 1, { from: seller });
        await jaslist.updateItemPrice(0, 2, { from: seller });
        const item = await jaslist.fetchItemPrice(0);
        console.log("this is item:", item);
        assert.equal(item, 2, "Error message.");
    });
});