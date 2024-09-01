//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Vote{
    struct Proposal{
        string name;
        uint votesCount;
    }
    struct Voter{
        bool voted;
        uint vote;
    }

    address chairperson;

    Proposal [] public proposals;

    mapping(address => Voter) public voters;

    constructor(){
        chairperson = msg.sender;
    } 

    modifier onlyAdmin(){
        require(msg.sender == chairperson, "No eres el administrador");
        _;
    }

    modifier onlyUserNoVotedYet(){
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Tu ya votaste");
        _;
    }

    function addProposal(string memory _name) public onlyAdmin{
        proposals.push(Proposal({
            name: _name,
            votesCount: 0
        }));
    }

    function vote (uint32 index) public onlyUserNoVotedYet{
        Voter storage sender = voters[msg.sender];
        sender.voted=true;
        sender.vote=index;
        proposals[index].votesCount += 1;
    }
}