// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// interface MindGames {
//     function startOrder(address, uint, uint, string[] memory) external;
//     function createNewUser() external;
// }

contract MGToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Mind Games Token", "MGT") {
        _mint(msg.sender, initialSupply *10**18);
    }

    // address MGcontractAddr;

    // function setMGcontractAddress(address _MGcontractAddr)public{
    //     MGcontractAddr = _MGcontractAddr;
    //     MindGames(MGcontractAddr).createNewUser();
    // }

    // function createOrder(uint _amt, uint _contestId, string[] memory _crypto) public{
    //     transfer(MGcontractAddr, _amt);
    //     address orderOwner = msg.sender;
    //     MindGames(MGcontractAddr).startOrder(orderOwner, _amt, _contestId, _crypto);
    // }
}