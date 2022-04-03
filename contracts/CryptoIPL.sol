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
}