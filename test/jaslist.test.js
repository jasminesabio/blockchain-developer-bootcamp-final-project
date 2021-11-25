const { assert } = require("chai");

const Jaslist = artifacts.require("Jaslist");

// require('chai')
//     .use(require('chai-as-promised'))
//     .should()

contract('Jaslist', ([deployer, seller, buyer]) => {

    let jaslist;

    before(async() => {
        jaslist = await Jaslist.deployed();
    });

    describe('deployment', async() => {
        it('should deploy smart contract properly', async() => {
            // console.log(jaslist.address);
            assert(jaslist.address !== '');
        });

        it('has an item count', async() => {
            const itemCount = await jaslist.itemCount();
            assert.equal(itemCount, 0);
        })
    });

    describe('items', async() => {
        let itemCount;
        let itemAdded;

        before(async() => {
            itemCount = await jaslist.itemCount();
            itemAdded = await jaslist.addItem("test", "test description", web3.utils.toWei('1', 'Ether'), { from: seller });   
        });

        it('should add item and increase item count', async() => {
            const itemAddedData = itemAdded.logs[0].args;
            // console.log("sku number is", itemAddedData.sku.toNumber());
            // console.log("item count is:", itemCount.toNumber(0))
            // // assert.equal(itemCount.toNumber(), 1);
            // assert.equal(itemAddedData.sku.toNumber(), itemCount.toNumber(), "sku is not correct")
            assert.equal(itemAddedData.name, "test", "name is not correct");
            assert.equal(itemAddedData.itemOwner, seller, "item owner is not correct");
        });

        it('lists items', async() => {
            // const item = await jaslist.fetchItemName(0); 
            // assert(item, "test");
            // console.log(itemCount);
            const item = await jaslist.items(1);
            assert.equal(item.name, "test", "name is not correct")
            assert.equal(item.itemOwner, seller, "item owner is not correct")

        });

        it('sells items and transfers eth to seller', async() => {
        //     let oldSellerBalance;
        //     oldSellerBalance = await web3.eth.getBalance(seller);
        //     oldSellerBalance = new web3.utils.BN(oldSellerBalance);
            
        //     purchase = await jaslist.buyItem(1, { from: buyer, value: web3.utils.toWei('1', 'Ether') });
            
        //     const itemSoldData = purchase.logs[0].args;
        //     // console.log(itemSoldData);
        //     assert.equal(itemSoldData.name, "test", "name is not correct");
        //     assert.equal(itemSoldData.itemOwner, buyer, "item owner is not correct");

        //     let newSellerBalance;
        //     newSellerBalance = await web3.eth.getBalance(seller);
        //     newSellerBalance = new web3.utils.BN(newSellerBalance);

        //     let price;
        //     price = web3.utils.toWei('1', 'Ether');
        //     price = new web3.utils.BN(price);

        //     // console.log(oldSellerBalance.toString(), newSellerBalance.toString(), price.toString());

        //     const expectedBalance = oldSellerBalance.add(price);
        //     assert.equal(newSellerBalance.toString(), expectedBalance.toString());

        // });

        

        });

        it('removes item', async() => {
            itemAddedToBeDeleted = await jaslist.addItem("test2", "test description2", web3.utils.toWei('1', 'Ether'), { from: seller });
            const removesItem = await jaslist.removeItem(2, { from: seller });
            const item = await jaslist.items(2);
            // assert.equal(item.itemOwner, seller, "item owner is not correct")
            // console.log("seller:", seller);
            // console.log(item);
            assert.equal(item.name, "ticket unavailable", "item has not been removed")
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