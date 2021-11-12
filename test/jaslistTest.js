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
        await jaslist.addItem("test", 420);
        const item = await jaslist.fetchItemName(0); 
        assert(item === "test");
    });
});

// contract("Jaslist", accounts => {
//   it("Should initalize with sku = 0", async () => {
//     const jaslistInstance = await Jaslist.deployed();

//     // Set value of 89
//     await jaslistInstance.addItem("test", 2, { from: accounts[0] });

//     // Get stored value
//     const result = await simpleStorageInstance.get.call();

//     assert.equal(result, true, "The value 89 was not stored.");
//   });
// });