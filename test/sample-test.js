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

describe("Add proposals", function(){
    it("Should return 1 proposals", async function(){
        const addProposalTx = await vote.addProposal("Juan")
        await addProposalTx.wait()
        expect(await vote.getLengthProposals()).to.equal(1);
    })
    it("Should not add a proposal", function(){
        expect(vote.connect(addr1).addProposal("Arturo")).to.be.revertedWith("Tu no eres administrador")
    })
});


describe("vote",function(){

    beforeEach(async function(){
        await vote.addProposal("test1")
        await vote.addProposal("test2")
        await vote.connect(addr1).vote(1)
    })

    it("Should add 1 vote", async function(){
        await vote.connect(addr2).vote(0)
        expect(await vote.getVotesById(0)).to.equal(1)
    })
    it("Should not add 1 vote", async function(){
        await expect(vote.connect(addr1).vote(0)).to.be.revertedWith("Tu ya votaste")    
    })
})

});