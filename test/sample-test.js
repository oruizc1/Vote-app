const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vote contract" , function()  {

    let vote;
    let Vote;
    let owner;
    let addr1;
    let addr2;


    beforeEach(async function(){
        Vote = await ethers.getContractFactory("Vote");
        [owner, addr1, addr2] = await ethers.getSigners();

        vote = await Vote.deploy();
    })

describe("Deploy", function(){
    it("Should set correctly the chairperson", async function(){
        const chairperson = await vote.getChairPerson();
        expect(chairperson).to.equal(owner.address);
    })

});

});