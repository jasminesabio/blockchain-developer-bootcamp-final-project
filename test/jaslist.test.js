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
        let itemAdded;
        let itemCount;

        before(async() => {
            itemAdded = await jaslist.addItem("test", "test description", web3.utils.toWei('1', 'Ether'), { from: seller });
            itemCount = await jaslist.itemCount();
        });

        it('should add item', async() => {
            const itemAddedData = itemAdded.logs[0].args;
            console.log(itemAddedData);
            assert.equal(itemAddedData.sku.toNumber(), itemCount.toNumber()-1, "sku is not correct")
            // assert.equal(itemAddedData.name, "test", "name is not correct");
            assert.equal(itemAddedData.owner, seller, "owner is not correct");

            //Failure:
            // await jaslist.addItem("", "test description", web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
        });

        it('increases item count', async() => {
            assert.equal(itemCount, 1);
        });

        it('lists items', async() => {
            // const item = await jaslist.fetchItemName(0); 
            // assert(item, "test");

            const item = await jaslist.items(itemCount-1);
            assert.equal(item.name, "test", "name is not correct")
        });

        it('sells items and transfers eth to seller', async() => {
            let oldSellerBalance;
            oldSellerBalance = await web3.eth.getBalance(seller);
            oldSellerBalance = new web3.utils.BN(oldSellerBalance);
            
            purchase = await jaslist.buyItem(0, { from: buyer, value: web3.utils.toWei('1', 'Ether') });
            
            const itemSoldData = purchase.logs[0].args;
            console.log(itemSoldData);
            assert.equal(itemSoldData.name, "test", "name is not correct");
            assert.equal(itemSoldData.owner, buyer, "owner is not correct");

            let newSellerBalance;
            newSellerBalance = await web3.eth.getBalance(seller);
            newSellerBalance = new web3.utils.BN(newSellerBalance);

            let price;
            price = web3.utils.toWei('1', 'Ether');
            price = new web3.utils.BN(price);

            console.log(oldSellerBalance.toString(), newSellerBalance.toString(), price.toString());

            const expectedBalance = oldSellerBalance.add(price);
            assert.equal(newSellerBalance.toString(), expectedBalance.toString());

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