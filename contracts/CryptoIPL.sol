// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract MindGames {

  address payable public owner;

   struct game { // to store the details of every order
    string team1;
    string team2;
    bool isActive;
    bool isAcceptingBets;
    uint team1bets;
    uint team2bets;
  }
  
  uint public numOfGames = 0;       // Total number of users in the smart contract
  mapping (uint => game) public games;

  modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
    
  function createGame(string memory _team1, string memory _team2) public onlyOwner {
    numOfGames++;
    games[numOfGames].isActive = true;
    games[numOfGames].isAcceptingBets = true;
    games[numOfGames].team1 = _team1;
    games[numOfGames].team2 = _team2;
  }

  function lockGame() public onlyOwner {
    games[numOfGames].isAcceptingBets = false;
  }

  function acceptBet(uint _gameNum, uint _teamNum) public payable{
    require(_gameNum>0,"Wrong game selected");
    require(games[_gameNum].isAcceptingBets == true, "Not accepting bets anymore");
    require(msg.value == 1 ether, "Not the right amount");
    if (_teamNum==1) {
      games[_gameNum].team1bets++;
    }
    else if (_teamNum==2) {
      games[_gameNum].team2bets++;
    }
  }

  function closeGame(uint _gameNum, uint _teamNum) public onlyOwner{
    require(_gameNum>0,"Wrong game selected");
    require(games[numOfGames].isAcceptingBets == false, "Wrong game selected");
    uint i;
    if (_teamNum==1) {
      for(i=1;i<=games[numOfGames].team1bets;i++){
        transfer()
      }
    }
    else if (_teamNum==2) {
      games[_gameNum].team2bets++;
    }

  }
}