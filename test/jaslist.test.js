const { assert } = require("console");

const Jaslist = artifacts.require("Jaslist");

contract('Jaslist', (accounts) => {

    let jaslist = null;
    const [seller, buyer] = accounts;

    before(async() => {
        jaslist = await Jaslist.deployed();
    });

    describe('deployment', async() => {
        it('should deploy smart contract properly', async () => {
            // console.log(jaslist.address);
            assert(jaslist.address !== '');
        });
    });

    describe('items', async() => {
        it('increases product count', async() => {
            const itemCount = await jaslist.sku();
            await jaslist.addItem("test", "test description", web3.utils.toWei('1', 'Ether'));
            assert(itemCount == 1);
        });

        it('should add item', async() => {
            await jaslist.addItem("test", "test description", web3.utils.toWei('1', 'Ether'));
            const item = await jaslist.fetchItemName(0); 
            assert(item, "test");
        });

    });

    

    
    
    // it('should update price', async() => {
    //     await jaslist.addItem("test1", "test description1", 1, { from: seller });
    //     await jaslist.updateItemPrice(0, 2, { from: seller });
    //     const item = await jaslist.fetchItemPrice(0);
    //     console.log("this is item:", item);
    //     assert.equal(item, 2, "Error message.");
    // });
});