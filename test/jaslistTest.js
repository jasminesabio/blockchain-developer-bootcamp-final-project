const Jaslist = artifacts.require("Jaslist");

contract('Jaslist', () => {

    let jaslist = null;

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
        await jaslist.addItem("test1", "test description1", 1);
        await jaslist.updateItemPrice(0, 2);
        const item = await jaslist.fetchItemPrice(0);
        assert(item === 2);
    });
});