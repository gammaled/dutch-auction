// Imports the DutchAuction contract for testing
const DutchAuction = artifacts.require("DutchAuction");
// Imports expect module from chai
const { expect } = require("chai");
// Imports helper function to test fetching a promise 
const utils = require("./helpers/utils");

// Testing smart contract
contract("DutchAuction", (accounts) => {

    // Variables used as parameters for constructor function
    let [seller, bidder] = accounts;
    let asset;
    let tokenId;
    let startPrice;
    let reservePrice;
    let endTime;
    // Variable defined when constructor is called
    let startTime;
    beforeEach(async () => {
        // Creating new contract instance before every individual test
        contractInstance = await DutchAuction.new(asset, tokenId, startPrice, reservePrice, endTime, {from: seller});
    });
    context("DutchAuction constructor", async () => {
        it("should have the owner as the address that initialised it", async () => {
            let owner = await contractInstance.owner();
            expect(owner).to.equal(seller);
        })
        it("should set value of startTime to the time of contract deployment", async () => {
            let blockTime = await contractInstance.startTime();
            // Converts the returned timestamp from milliseconds --> seconds
            let currentTime = Date.now() / 1000;
            let timeCheck = (blockTime >= currentTime - 15 && blockTime <= currentTime + 15);

            expect(timeCheck).to.equal(true);
        })
        it("should have an assertion that checks if startPrice greater than reservePrice", async () => {
            // Assertion should leave startPrice and reservePrice undefined if the statement above is not true
            let result = await contractInstance.startPrice();
            // Checks if startPrice is neither undefined nor null
            let checkValue = result == !(undefined || null);
            expect(checkValue).to.equal(true);
        })
        it("should have an assertion that checks if endTime is greater than startTime", async () => {
            // Assertion should leave endTime and startTime undefined if the statement above is not true
            let result = await contractInstance.endTime();
            // Checks if endTime is neither undefined nor null
            let checkValue = result == !(undefined || null);
            expect(checkValue).to.equal(true);
        })
    })
    context("bid() function", async () => {
        it("should only work if there has been no bid made", async () => {
            // Bid() function will only be called if no bid has been made and returns true in this case.
            let bidder = await contractInstance.bidder();
            let result = await contractInstance.bid();
            // True is returned if there has been no previous bidder
            function ifPreviousBidMade(bidder) {
                if (bidder == (undefined || null)) {
                    return true;
                } else {
                    return false;
                }
            }
            // The result of the bid() function returns "true"
            expect(ifPreviousBidMade(bidder)).to.equal(result);
        })
        it("should only allow a caller (bidder) that has the startPrice in their wallet", async () => {
            //TODO: Test to check balance of msg.sender (bidder) has the required capital to enter bid
            let bidderBalance = parseInt(await web3.utils.fromWei(await web3.eth.getBalance(bidder)));
            if (bidderBalance === startPrice) {
                expect(contractInstance.bid()).to.equal(true);
            } else {
                expect(contractInstance.bid()).to.equal(!true);
            }

        })
        it("should have condition that asserts that reservePrice < startPrice", async () => {
            // If it is reverted, then these variables should be left undefined so this check would check for this.
            let startPrice = await contractInstance.startPrice();
            let reservePrice = await contractInstance.reservePrice();

            expect(startPrice && reservePrice).to.be.a("number");
            expect(startPrice > reservePrice).to.equal(true);

            if (startPrice > reservePrice) {
                expect(contractInstance).to.equal(!undefined);
            } else {
                expect(contractInstance).to.equal(undefined);
            }

        })
        it("should transfer ownership from seller to bidder", async () => {
            // This test should check that owner == bidder, so ownership was transferred from seller --> bidder
            let bidMade = await contractInstance.bid();
            let owner = await contractInstance.owner();
            console.log(owner);

            if(bidMade == true) {
                expect(owner).to.equal(bidder);
            } else {
                expect(owner).to.equal(seller);
            }
        })
    })
})