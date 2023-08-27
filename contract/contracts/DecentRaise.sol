// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CampaignNFT.sol";

contract DecentRaise {
    struct Campaign {
        string name;
        string tagline;
        string description;
        string logo;
        string projectLink;
        string cover;
        string twitter;
        uint goal;
        uint deadline;
        uint totalContributions;
        bool isCampaignActive;
        address nftAddress;
    }

    mapping(uint => mapping(address => uint)) contributions;
    Campaign[] public campaigns;

    uint public totalCampaigns = 0;

    constructor() {}

    modifier campaignActive(uint campaignId) {
        require(
            campaigns[campaignId].isCampaignActive,
            "Campaign is not active"
        );
        _;
    }

    function createCampaign(
        string memory _name,
        string memory _tagline,
        string memory _description,
        string memory _logo,
        string memory _cover,
        string memory _projectLink,
        string memory _twitter,
        string memory _tokenSymbol,
        uint _goal,
        uint _durationDays
    ) external {
        CampaignNFT _newCampaignNft = new CampaignNFT(_name, _tokenSymbol);
        totalCampaigns++;
        campaigns.push(
            Campaign(
                _name,
                _tagline,
                _description,
                _logo,
                _projectLink,
                _cover,
                _twitter,
                _goal,
                block.timestamp + (_durationDays * 1 days),
                0,
                true,
                address(_newCampaignNft)
            )
        );
    }

    function contribute(
        uint campaignId
    ) external payable campaignActive(campaignId) {
        require(
            block.timestamp < campaigns[campaignId].deadline,
            "Campaign is not active"
        );
        require(msg.value > 0, "Contribution must be > 0");
        contributions[campaignId][msg.sender] += msg.value;
        campaigns[campaignId].totalContributions += msg.value;

        string memory _uri = campaigns[campaignId].logo;
        CampaignNFT(campaigns[campaignId].nftAddress).safeMint(
            msg.sender,
            _uri
        );
    }

    function withdrawFunds(
        uint campaignId
    ) external campaignActive(campaignId) {
        require(
            block.timestamp >= campaigns[campaignId].deadline,
            "Campaign is still active"
        );
        require(
            campaigns[campaignId].totalContributions >=
                campaigns[campaignId].goal,
            "Campaing was not successfull"
        );
        require(
            contributions[campaignId][msg.sender] > 0,
            "No funds to withdraw"
        );

        campaigns[campaignId].isCampaignActive = false;
        uint amount = campaigns[campaignId].totalContributions;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }

    function getRefund(uint campaignId) external {
        require(
            block.timestamp >= campaigns[campaignId].deadline,
            "Campaign has not ended"
        );
        require(
            campaigns[campaignId].totalContributions <
                campaigns[campaignId].goal,
            "Campaing was successfull"
        );

        campaigns[campaignId].isCampaignActive = false;
        uint amount = contributions[campaignId][msg.sender];
        contributions[campaignId][msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}
