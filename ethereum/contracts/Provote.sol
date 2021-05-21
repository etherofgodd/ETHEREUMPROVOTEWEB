// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ProvoteFactory {
    address[] public deployedElections;

    function createProvote(
        string[] memory candiateList,
        string memory contractdescription
    ) public {
        address newCampaign =
            address(new Provote(candiateList, contractdescription, msg.sender));

        deployedElections.push(newCampaign);
    }

    function getDeployedElections() public view returns (address[] memory) {
        return deployedElections;
    }
}

contract Provote {
    struct Candidate {
        //Candidate model and schema;
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool voted;
        uint256 vote;
        bool rightToVote; //right to vote.
    }

    address public INECPERSONNEL;
    bool public campaignDay = true;
    bool public countingDay = false;
    string public description;

    mapping(address => Voter) public voters;

    Candidate[] public candidates;

    constructor(
        string[] memory candiateList,
        string memory contractdescription,
        address creator
    ) {
        INECPERSONNEL = creator;
        description = contractdescription;

        for (uint256 i = 0; i < candiateList.length; i++) {
            candidates.push(Candidate({name: candiateList[i], voteCount: 0}));
        }
    }

    modifier restricted {
        require(msg.sender == INECPERSONNEL);
        _;
    }

    function endCampaign() public restricted {
        campaignDay = false;
    }

    function startCounting() public restricted {
        countingDay = true;
    }

    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }

    function registerVoter(address voter) public restricted {
        require(
            campaignDay == true,
            "That campaingDay is true for this election"
        );
        require(!voters[voter].voted, "The current voter has not voted before");
        require(voters[voter].rightToVote == false, "User not allowed to vote");

        voters[voter].rightToVote = true;
    }

    function vote(uint256 candidate) public {
        require(
            campaignDay == false,
            "Make sure no one can vote on campaignDay"
        );
        require(countingDay == false, "Makes sure, it's countingDay before ");

        Voter storage sender = voters[msg.sender];
        require(sender.rightToVote != false, "Has no right to vote");
        require(!sender.voted, "Can't vote twice !");
        sender.voted = true;
        sender.vote = candidate;

        candidates[candidate].voteCount += 1;
    }

    function countVote() public view returns (uint256 winningCanndate) {
        uint256 leadingCandidateCount = 0;
        for (uint256 c = 0; c < candidates.length; c++) {
            if (candidates[c].voteCount > leadingCandidateCount) {
                leadingCandidateCount = candidates[c].voteCount;
                winningCanndate = c;
            }
        }
    }

    function winnerName() public view returns (string memory candidateName) {
        require(campaignDay == false);
        require(countingDay == true);

        candidateName = candidates[countVote()].name;
    }
}
