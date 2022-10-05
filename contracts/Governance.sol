// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "./PowerNFT.sol";

// contract Governance is Ownable {
//     // using Counters
//     using Counters for Counters.Counter;

//     // creating enums
//     enum ProposalStatus {
//         PENDING,
//         ACCEPTED,
//         REJECTED,
//         FAILED,
//         Cancelled
//     }

//     enum VoteAns {
//         YES,
//         NO
//     }

//     // creating structures
//     struct Vote {
//         address votedBy; // address of the voter
//         string description; // description of the vote
//         uint256 votedAt; // unix timeStamp when voted
//         VoteAns voteAns; // answer of the vote
//         uint256 votePower; // power of the voter when voted
//     }

//     struct Proposal {
//         uint256 id; // id of the proposal
//         string description; // description of the proposal
//         address proposalCreatedBy; // user who creates the proposal
//         uint256 createdAt; // time at which the proposal is created
//         uint256 votingEndTime; // unix timeStamp when the voting will end
//         ProposalStatus status; // status of the proposal
//         uint256 numberOfVotes; // total number of the votes received
//         uint256 yesPower; // total power of the `yes` votes
//         uint256 noPower; // total power of the `no` votes
//         uint256 threshold; // threshold to consider for voting
//     }

//     // creating events
//     event ProposalCreated(uint256 id, string description, address proposalCreatedBy, uint256 createdAt, uint256 votingEndTime, uint256 threshold);
//     event ProposalUpdated(uint256 id, string description, uint256 votingEndTime, uint256 threshold);
//     event VoteCreated(uint256 id, string description, address votedBy, uint256 voteCreatedAt, VoteAns voteAns, uint256 votePower);

//     // defining variables
//     Counters.Counter public _proposalIds;
//     Governance public governance;
//     mapping(uint256 => mapping(address => bool)) public isVotedForProposalByAddress; // get if the a particular address has voted for any paricular proposal
//     Proposal[] public proposals; // array of proposals
//     mapping(uint256 => Vote[]) public votesForAllProposals; // array of votes for all proposals
//     uint256 private keeperPower = 10**18;
//     uint256 private orderPower = keeperPower / 2;
//     uint256 private collectivePower = keeperPower / 4;
//     uint256 private userPower = keeperPower / 8;
//     PowerNFT public powerNFT;


//     constructor(PowerNFT _powerNFTAddress) {
//         powerNFT = _powerNFTAddress;
//         Proposal memory _proposal = Proposal({
//             id: 0,
//             description: "Hello",
//             proposalCreatedBy: address(0),
//             createdAt: 0,
//             votingEndTime: 0,
//             threshold: 0,
//             numberOfVotes: 0,
//             yesPower: 0,
//             noPower: 0,
//             status: ProposalStatus.PENDING
//         });
//         proposals.push(_proposal);
//     }

//     modifier isKeeperOrOwner(uint256 _nftId) {
//         require(owner() == address(msg.sender) || (_nftId != 0 && powerNFT.ownerOf(_nftId)==msg.sender && powerNFT.powerOfNFTs(_nftId) == keeperPower), "Access Denied");
//         _;
//     }

//     function createProposal(uint256 _votingEndTime, string memory description,  uint256 _threshold, uint256 _nftId) isKeeperOrOwner(_nftId) external {
//         uint256 _currentTime = block.timestamp;
//         _proposalIds.increment();
//         Proposal memory _proposal = Proposal({
//             id: _proposalIds.current(),
//             description: description,
//             proposalCreatedBy: msg.sender,
//             createdAt: _currentTime,
//             votingEndTime: _votingEndTime,
//             threshold: _threshold,
//             numberOfVotes: 0,
//             yesPower: 0,
//             noPower: 0,
//             status: ProposalStatus.PENDING
//         });
//         proposals.push(_proposal);
//         emit ProposalCreated(_proposalIds.current(), description, msg.sender, _currentTime, _proposal.votingEndTime, _proposal.threshold);
//     }

//     function voteForProposal(uint256 _id, bool _isApproved, string memory _description, uint256 _nftId) external {
//         if(_nftId != 0){
//             require(powerNFT.ownerOf(_nftId)==msg.sender, "You are not the owner of this NFT");
//         }
//         require(!isVotedForProposalByAddress[_id][msg.sender], "You have already voted for this proposal");
//         require(_id>0 && _id <= proposals.length, "Invalid id");
//         uint256 _currentTime = block.timestamp;
//         require(_currentTime >= proposals[_id].createdAt, "Voting is not yet started!");
//         require(_currentTime <= proposals[_id].votingEndTime, "Voting has been ended!");
//         uint256 _userPower = userPower;
//         if(_nftId != 0){
//             _userPower = powerNFT.powerOfNFTs(_nftId);
//         }
//         Vote memory _vote = Vote(msg.sender, _description, _currentTime, _isApproved ? VoteAns.YES : VoteAns.NO, _userPower);
//         votesForAllProposals[_id].push(_vote);
//         isVotedForProposalByAddress[_id][msg.sender] = true;
//         proposals[_id].numberOfVotes++;
//         if(_isApproved){
//             proposals[_id].yesPower += _userPower;
//         }else{
//             proposals[_id].noPower += _userPower;
//         }
//         emit VoteCreated(_id, _description, msg.sender, _currentTime, _isApproved ? VoteAns.YES : VoteAns.NO, _userPower);
//     }

//     function updateStatusOfProposal(uint256 _id, uint256 _nftId) isKeeperOrOwner(_nftId) external {
//         require(_id>0 && _id <= proposals.length, "Invalid id");
//         uint256 _currentTime = block.timestamp;
//         require(_id>0 && _id <= proposals.length, "Invalid id");
//         require(_currentTime > proposals[_id].votingEndTime, "Voting is not ended yet!");
//         if(proposals[_id].status == ProposalStatus.PENDING){
//             if(proposals[_id].numberOfVotes != 0 && proposals[_id].threshold <= proposals[_id].numberOfVotes){
//                 if(proposals[_id].yesPower >= proposals[_id].noPower){
//                     proposals[_id].status = ProposalStatus.ACCEPTED;
//                 }else{
//                     proposals[_id].status = ProposalStatus.REJECTED;
//                 }
//             }else{
//                 proposals[_id].status = ProposalStatus.FAILED;
//             }
//         }
//     }

// }