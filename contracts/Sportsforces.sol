// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Sportsforces {

    struct Sport {
        uint playerRating;
        uint coachRating;
        string[] achievements;
    }

    struct User {
        Sport badminton;
        uint agility;
        uint strength;
    }

    struct Match {
        uint matchId;
        address player1;
        address player2;
        address winner;
        address Learner;
    }
    
    struct Tournament {
        uint tournamentId;
        Match[] matches;
        address[] participants;
    }

    struct GenericTournament {
        Tournament tournament;
        mapping(address=>uint) matchesWonBy;
        mapping(address=>uint) Delta;
        mapping(address=>uint) standings;
    }

    struct StakingTournament {
        Tournament tournament;
        uint stakedAmount;
        mapping(address=>uint) matchesWonBy;
        mapping(address=>uint) standings;
    }

    mapping(uint=>GenericTournament) public genericTournamentMapper;
    mapping(uint=>StakingTournament) public stakingTournamentMapper;
    mapping(uint=>Match) public matchMapper;
    mapping(uint=>uint) p1VoteCount;
    mapping(uint=>uint) p2VoteCount;
    mapping(uint=>uint) public remainingMatches;
    mapping(address=>User) public userMapping;
    uint counter = 1;
    address owner;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    function createGenericTournament() public {
        GenericTournament storage newGenericTournament = genericTournamentMapper[counter];
        newGenericTournament.tournament.tournamentId = counter;
        counter++;
    }

    function createStakingTournament(uint amount) public {
        StakingTournament storage stakingTournament = stakingTournamentMapper[counter];
        stakingTournament.tournament.tournamentId = counter;
        stakingTournament.stakedAmount = amount;
        counter++;
    }

    function registerGeneric(uint tournamentId) public {
        GenericTournament storage genTournament = genericTournamentMapper[tournamentId];
        genTournament.tournament.participants.push(msg.sender);
    }

    function registerStaking(uint tournamentId) public payable {
        StakingTournament storage stakeTournament = stakingTournamentMapper[tournamentId];
        require(msg.value == stakeTournament.stakedAmount, "Please pay!");
        stakeTournament.tournament.participants.push(msg.sender);
    }

    function startGenericTournament(uint tournamentId) public onlyOwner {
        GenericTournament storage tournament = genericTournamentMapper[tournamentId];
        makeMatches(tournament.tournament.participants, tournament);
    }

    function startStakingTournament(uint tournamentId) public onlyOwner {
        StakingTournament storage tournament = stakingTournamentMapper[tournamentId];
        makeMatches(tournament.tournament.participants, tournament);
    }

    function makeMatches(address[] memory winners, GenericTournament storage tournament) private  {
        for(uint i=0; i<winners.length; i+=2){
            Match storage matchStruct = matchMapper[counter];
            matchStruct.matchId = counter;
            matchStruct.player1 = winners[i];
            matchStruct.player2 = winners[i+1];
            tournament.tournament.matches.push(matchStruct);
            matchMapper[counter] = matchStruct;
            counter++;
        }
        remainingMatches[tournament.tournament.tournamentId] = winners.length/2;
    }

    function makeMatches(address[] memory winners, StakingTournament storage tournament) private  {
        for(uint i=0; i<winners.length; i+=2){
            Match storage matchStruct = matchMapper[counter];
            matchStruct.matchId = counter;
            matchStruct.player1 = winners[i];
            matchStruct.player2 = winners[i+1];
            tournament.tournament.matches.push(matchStruct);
            matchMapper[counter] = matchStruct;
            counter++;
        }
        remainingMatches[tournament.tournament.tournamentId] = winners.length/2;
    }

    function decideWinners(bool isP1Winner, uint matchId) private {
        Match memory matchStruct = matchMapper[matchId];
        address winner = isP1Winner?matchStruct.player1:matchStruct.player2;
        address learner = isP1Winner?matchStruct.player2:matchStruct.player1;
        matchStruct.winner = winner;
        matchStruct.Learner = learner;
        matchMapper[matchId] = matchStruct;
    }
    
    function voting(uint matchId, uint player, uint tournamentId) public {
        if(player==1) p1VoteCount[matchId]++;
        else if(player==2) p2VoteCount[matchId]++;

        if(p1VoteCount[matchId]+p2VoteCount[matchId]>=1) {
            bool isP1Winner = p1VoteCount[matchId]>p2VoteCount[matchId]?true:false;
            decideWinners(isP1Winner, matchId);
            remainingMatches[tournamentId]--;
            if(remainingMatches[tournamentId]==0) {
                if(genericTournamentMapper[tournamentId].tournament.tournamentId==tournamentId){

                        startNextRoundGeneric(tournamentId);
                }
                else {
                        startNextRoundStaking(tournamentId);
                }
            }
        }
    }

    function startNextRoundGeneric(uint tournamentId) private {
        GenericTournament storage tournament = genericTournamentMapper[tournamentId];
        Match[] memory matches = tournament.tournament.matches;
        address[] memory winners = new address[](matches.length);
        for(uint i = 0; i < matches.length; i++) {
            matches[i] = matchMapper[matches[i].matchId];
            winners[i] = matches[i].winner;
            tournament.matchesWonBy[winners[i]]++;
        }
        if(tournament.tournament.matches.length==1) endGenericTournament(tournamentId);
        else{
            delete tournament.tournament.matches;
            makeMatches(winners, tournament);
        }
    }

    function startNextRoundStaking(uint tournamentId) private {
        StakingTournament storage tournament = stakingTournamentMapper[tournamentId];
        Match[] memory matches = tournament.tournament.matches;
        address[] memory winners = new address[](matches.length);
        for(uint i = 0; i < matches.length; i++) {
            matches[i] = matchMapper[matches[i].matchId];
            winners[i] = matches[i].winner;
            tournament.matchesWonBy[winners[i]]++;
        }
        
        if(tournament.tournament.matches.length==1) endStakingTournament(tournamentId);
        else{
            delete tournament.tournament.matches;
            makeMatches(winners, tournament);
        }
    }

    function endGenericTournament(uint tournamentId) private {
        GenericTournament storage tournament = genericTournamentMapper[tournamentId];
        uint logN = 0;
        address[] memory participants = tournament.tournament.participants;
        uint l=participants.length;
        for(uint i=0; i<l; i++){
            uint matchesWon = tournament.matchesWonBy[participants[i]];
            logN = logN<matchesWon?matchesWon:logN;
        }

        for(uint i =0; i<l; i++){
            uint matchesWon = tournament.matchesWonBy[participants[i]];
            if(logN == matchesWon) tournament.standings[participants[i]] = 1;
            else if(logN-1 == matchesWon) tournament.standings[participants[i]] = 2;
            else{
                uint maxStanding = 1<<(logN-matchesWon);
                uint minStanding = 1<<(logN-matchesWon-1)+1;
                tournament.standings[participants[i]] = (minStanding+maxStanding)/2;
            }
        }
        changeRatings(participants, tournament.standings);
    }

    function endStakingTournament(uint tournamentId) private {
        StakingTournament storage tournament = stakingTournamentMapper[tournamentId];
        uint logN = 0;
        address[] memory participants = tournament.tournament.participants;
        uint l=participants.length;
        for(uint i=0; i<l; i++){
            uint matchesWon = tournament.matchesWonBy[participants[i]];
            logN = logN<matchesWon?matchesWon:logN;
        }

        for(uint i =0; i<l; i++){
            uint matchesWon = tournament.matchesWonBy[participants[i]];
            if(logN == matchesWon) tournament.standings[participants[i]] = 1;
            else if(logN-1 == matchesWon) tournament.standings[participants[i]] = 2;
            else{
                uint maxStanding = 1<<(logN-matchesWon);
                uint minStanding = 1<<(logN-matchesWon-1)+1;
                tournament.standings[participants[i]] = (minStanding+maxStanding)/2;
            }
        }
        distributePrize(tournamentId, tournament.tournament.participants, tournament.standings);
    }

    function changeRatings(address[] memory participants, mapping(address => uint) storage standings) internal {
        uint len = participants.length;
        address[] memory sortedParticipants = new address[](len);
        
        // Copy participants to sortedParticipants
        for (uint i = 0; i < len; i++) {
            sortedParticipants[i] = participants[i];
        }
        
        // Sort participants based on badminton rating (expected ranking)
        for (uint i = 0; i < len; i++) {
            for (uint j = i + 1; j < len; j++) {
                if (userMapping[sortedParticipants[i]].badminton.playerRating < userMapping[sortedParticipants[j]].badminton.playerRating) {
                    address temp = sortedParticipants[i];
                    sortedParticipants[i] = sortedParticipants[j];
                    sortedParticipants[j] = temp;
                }
            }
        }

        // Calculate the rating changes based on delta between expected and actual rankings
        for (uint i = 0; i < len; i++) {
            address participant = participants[i];
            uint actualStanding = standings[participant];
            // Find expected standing by searching sortedParticipants
            uint expectedStanding;
            for (uint j = 0; j < len; j++) {
                if (sortedParticipants[j] == participant) {
                    expectedStanding = j + 1; // Rankings start from 1
                    break;
                }
            }

            // Delta is the difference between expected and actual standing
            int delta = int(expectedStanding) - int(actualStanding);

            // Adjust the player's badminton rating based on delta
            uint adjustment = uint(delta >= 0 ? delta * 10 : delta * -5); // Example logic: gain 10 points per rank improvement, lose 5 per underperformance

            if (delta > 0) {
                // Player outperformed expectations, increase rating
                userMapping[participant].badminton.playerRating += adjustment;
            } else if (delta < 0) {
                // Player underperformed, decrease rating
                if(userMapping[participant].badminton.playerRating >= adjustment)
                userMapping[participant].badminton.playerRating -= adjustment;
                else userMapping[participant].badminton.playerRating = 0;
            }
        }
    }

    function distributePrize(uint tournamentId, address[] memory participants, mapping(address=>uint) storage standings) internal {
        uint len = participants.length;
        uint firstAward = (stakingTournamentMapper[tournamentId].stakedAmount)*len*6/10;
        uint secondAward = (stakingTournamentMapper[tournamentId].stakedAmount)*len*4/10;
        for(uint i = 0; i < len; i++) {
            if(standings[participants[i]] == 1) {
                payable(participants[i]).transfer(firstAward);
            }
            else if(standings[participants[i]] == 2) {
                payable(participants[i]).transfer(secondAward);
            }
        }
    }
}