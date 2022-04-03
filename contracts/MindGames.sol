// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MindGames {

  AggregatorV3Interface internal btcPriceFeed;
  AggregatorV3Interface internal ethPriceFeed;
  AggregatorV3Interface internal maticPriceFeed;
  AggregatorV3Interface internal linkPriceFeed;

  //Comment below lines for polygon Mumbai testnet
  // AggregatorV3Interface internal bnbPriceFeed;
  // AggregatorV3Interface internal xrpPriceFeed;
  // AggregatorV3Interface internal adaPriceFeed;
  // AggregatorV3Interface internal solPriceFeed;
  // AggregatorV3Interface internal lunaPriceFeed;
  // AggregatorV3Interface internal dotPriceFeed;
  // AggregatorV3Interface internal dogePriceFeed;
  // AggregatorV3Interface internal ltcPriceFeed;
  // AggregatorV3Interface internal trxPriceFeed;
  // AggregatorV3Interface internal bchPriceFeed;
  // AggregatorV3Interface internal algoPriceFeed;
  // AggregatorV3Interface internal xlmPriceFeed;
  // AggregatorV3Interface internal zecPriceFeed;
  // AggregatorV3Interface internal dashPriceFeed;



  IERC20 token;

  address payable public owner; //to store the owner's address
  
  //Comment below line for mainnet
  string[] public allCrypto = ["btc", "eth", "matic", "link"];

  //Comment below line for testnet
  // string[] public allCrypto = ["btc", "eth", "matic", "link", "bnb", "xrp", "ada", "sol", "luna", "dot", "doge", "ltc", "trx", "bch", "algo", "xlm", "zec", "dash"];

  struct order { // to store the details of every order
    address orderOwner;
    uint contestId;
    bool isActive;
    string[] crypto;
    uint[] allocation;
  }

  struct contest {
    bool isActive;
    bool isStarted;
    uint entryFee;
    uint[] startPrices;
    uint[] endPrices;
    uint[] listOfOrders;
  }

  uint public numOfUsers = 0;       // Total number of users in the smart contract
  mapping (address => uint) public users; // users' respective addresses

  uint public numOfOrders; //Total number of orders
  mapping (uint => order) orders; //mapping for the ordernumber of each order: not set to public due to viewOrder fuction
  
  uint public numOfContests; //Total number of contests
  mapping (uint => contest) contests; //mapping for the ordernumber of each order: not set to public due to viewOrder fuction
  
  constructor(address _tokenAddr) {
    owner = payable(msg.sender); //setting the owner of the contract
    token = IERC20(_tokenAddr);

    //Comment below lines for mainnet
    btcPriceFeed = AggregatorV3Interface(0x007A22900a3B98143368Bd5906f8E17e9867581b);
    ethPriceFeed = AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A);
    maticPriceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    linkPriceFeed = AggregatorV3Interface(0x12162c3E810393dEC01362aBf156D7ecf6159528);

    //Comment below lines for testnet
    // btcPriceFeed = AggregatorV3Interface(0xc907E116054Ad103354f2D350FD2514433D57F6f);
    // ethPriceFeed = AggregatorV3Interface(0xF9680D99D6C9589e2a93a78A04A279e509205945);
    // maticPriceFeed = AggregatorV3Interface(0xAB594600376Ec9fD91F8e885dADF0CE036862dE0  );
    // linkPriceFeed = AggregatorV3Interface(0xd9FFdb71EbE7496cC440152d43986Aae0AB76665);
    // bnbPriceFeed = AggregatorV3Interface(0x82a6c4AF830caa6c97bb504425f6A66165C2c26e);
    // xrpPriceFeed = AggregatorV3Interface(0x785ba89291f676b5386652eB12b30cF361020694);
    // adaPriceFeed = AggregatorV3Interface(0x882554df528115a743c4537828DA8D5B58e52544);
    // solPriceFeed = AggregatorV3Interface(0x10C8264C0935b3B9870013e057f330Ff3e9C56dC);
    // lunaPriceFeed = AggregatorV3Interface(0x1248573D9B62AC86a3ca02aBC6Abe6d403Cd1034);
    // dotPriceFeed = AggregatorV3Interface(0xacb51F1a83922632ca02B25a8164c10748001BdE);
    // dogePriceFeed = AggregatorV3Interface(0xbaf9327b6564454F4a3364C33eFeEf032b4b4444);
    // ltcPriceFeed = AggregatorV3Interface(0xEB99F173cf7d9a6dC4D889C2Ad7103e8383b6Efa);
    // trxPriceFeed = AggregatorV3Interface(0x307cCF7cBD17b69A487b9C3dbe483931Cf3E1833);
    // bchPriceFeed = AggregatorV3Interface(0x327d9822e9932996f55b39F557AEC838313da8b7);
    // algoPriceFeed = AggregatorV3Interface(0x03Bc6D9EFed65708D35fDaEfb25E87631a0a3437);
    // xlmPriceFeed = AggregatorV3Interface(0x692AE5510cA9070095A496dbcFBCDA99D4024Cd9);
    // zecPriceFeed = AggregatorV3Interface(0xBC08c639e579a391C4228F20d0C29d0690092DF0);
    // dashPriceFeed = AggregatorV3Interface(0xD94427eDee70E4991b4b8DdCc848f2B58ED01C0b);
  }

  modifier checkNewUser() {   //checking if the new user has already registered before
    if(users[msg.sender] != 0) {
      revert("User already exists");
    }     
    _;
  }

  modifier checkExistingUser() {      //Add check for existing user
    if(users[msg.sender] == 0) {
      revert("User does not exist");
    }     
    _;
  }

  modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

  function createNewUser(address _spender) public checkNewUser(){ // to register new user in smart contract
    numOfUsers++;
    users[msg.sender] = numOfUsers;
    token.approve(_spender, 0);
  }

  function createContest(uint _entryFee) public onlyOwner returns (uint newContestIdCreated){
    numOfContests++;
    contests[numOfContests].entryFee = _entryFee;
    contests[numOfContests].isActive = true;
    return numOfContests;
  }


  function startOrder(uint _amt, uint _contestId, string[] memory _crypto) public checkExistingUser(){  //Creating a new order
    numOfOrders++;
    require(_amt==contests[_contestId].entryFee,"Please input the right number of MGT tokens");
    uint percent = _amt/100;
    uint entryFee = percent*95;
    token.transferFrom(msg.sender, address(this), entryFee);
    token.transferFrom(msg.sender, owner, percent*5);
    orders[numOfOrders].orderOwner = msg.sender;
    orders[numOfOrders].contestId = _contestId;
    orders[numOfOrders].isActive = true;
    orders[numOfOrders].crypto = _crypto;
    contests[_contestId].listOfOrders.push(numOfOrders);
  }

    function startContest(uint _contestId) public onlyOwner(){
        contests[_contestId].isStarted = true;
        uint i;
        for(i=0;i<allCrypto.length;i++) {
            contests[_contestId].startPrices.push(getLatestPrice(allCrypto[i]));
        }

        uint j;
        for (i=0;i<contests[_contestId].listOfOrders.length;i++){
          for(j=0;j<orders[contests[_contestId].listOfOrders[i]].crypto.length;j++){
            if(j==0){
              orders[contests[_contestId].listOfOrders[i]].allocation.push((20000*10**18)/getLatestPrice(orders[contests[_contestId].listOfOrders[i]].crypto[j]));
            }
            else if (j==1){
              orders[contests[_contestId].listOfOrders[i]].allocation.push((17500*10**18)/getLatestPrice(orders[contests[_contestId].listOfOrders[i]].crypto[j]));
            }
            else if (j==2){
              orders[contests[_contestId].listOfOrders[i]].allocation.push((15000*10**18)/getLatestPrice(orders[contests[_contestId].listOfOrders[i]].crypto[j]));
            }
            else{
              orders[contests[_contestId].listOfOrders[i]].allocation.push((10000*10**18)/getLatestPrice(orders[contests[_contestId].listOfOrders[i]].crypto[j]));
            }
          }
        }
    }

    function endContest(uint _contestId) public onlyOwner(){   
        uint i;
        for(i=0;i<allCrypto.length;i++) {
            contests[_contestId].endPrices.push(getLatestPrice(allCrypto[i]));
        }

        for(i=0;i<contests[_contestId].listOfOrders.length;i++){
          orders[contests[_contestId].listOfOrders[i]].isActive = false;
        }
        contests[_contestId].isActive = false;
    }

  function viewOrder(uint _orderID) public view returns(address orderOwner, uint contestId, bool isActive, string[] memory crypto, uint[] memory allocation) {  // Used to view existing orders
    return (orders[_orderID].orderOwner, orders[_orderID].contestId, orders[_orderID].isActive, orders[_orderID].crypto, orders[_orderID].allocation);
  }

  function viewContest(uint _contestId) public view returns(bool isActive, bool isStarted, uint entryFee, uint[] memory startPrices, uint[] memory endPrices, uint[] memory listOfOrders) {  // Used to view existing contests
    return (contests[_contestId].isActive, contests[_contestId].isStarted, contests[_contestId].entryFee, contests[_contestId].startPrices, contests[_contestId].endPrices, contests[_contestId].listOfOrders);
  }

    /**
     * Oracles for each price feed
     */

  function getLatestPriceBtc() public view returns (uint) {
      (
          uint80 roundID, 
          int price,
          uint startedAt,
          uint timeStamp,
          uint80 answeredInRound
      ) = btcPriceFeed.latestRoundData();
      return uint(price);
  }

  function getLatestPriceEth() public view returns (uint) {
      (
          uint80 roundID, 
          int price,
          uint startedAt,
          uint timeStamp,
          uint80 answeredInRound
      ) = ethPriceFeed.latestRoundData();
      return uint(price);
  }

  function getLatestPriceMatic() public view returns (uint) {
      (
          uint80 roundID, 
          int price,
          uint startedAt,
          uint timeStamp,
          uint80 answeredInRound
      ) = maticPriceFeed.latestRoundData();
      return uint(price);
  }

  //Comment below lines for mainnet
  function getLatestPriceLink() public view returns (uint) {
      (
          uint80 roundID, 
          int price,
          uint startedAt,
          uint timeStamp,
          uint80 answeredInRound2
      ) = linkPriceFeed.latestRoundData();
      (
          uint80 broundID, 
          int bprice,
          uint bstartedAt,
          uint btimeStamp,
          uint80 bansweredInRound
      ) = maticPriceFeed.latestRoundData();
      return uint(price * bprice / (10**18));
  }

  //Comment below lines for testnet: From here:-
  // function getLatestPriceLink() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = linkPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceBnb() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = bnbPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceXrp() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = xrpPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceAda() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = adaPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceSol() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = solPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceLuna() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = lunaPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceDot() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = dotPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceDoge() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = dogePriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceLtc() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = ltcPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceTrx() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = trxPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceBch() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = bchPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceAlgo() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = algoPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceXlm() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = xlmPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceZec() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = zecPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  // function getLatestPriceDash() public view returns (uint) {
  //     (
  //         uint80 roundID, 
  //         int price,
  //         uint startedAt,
  //         uint timeStamp,
  //         uint80 answeredInRound
  //     ) = dashPriceFeed.latestRoundData();
  //     return uint(price);
  // }

  //Until here:-


  function getLatestPrice(string memory input) internal view returns (uint cryptoPrice) {
    if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("btc")))){
      return getLatestPriceBtc();
    } else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("eth")))){
      return getLatestPriceEth();
    } else if( (keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("matic")))){
      return getLatestPriceMatic();
    } else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("link")))){
      return getLatestPriceLink();
    }

    //Comment below lines for testnet:
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("bnb")))){
    //   return getLatestPriceBnb();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("xrp")))){
    //   return getLatestPriceXrp();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("ada")))){
    //   return getLatestPriceAda();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("sol")))){
    //   return getLatestPriceSol();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("luna")))){
    //   return getLatestPriceLuna();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("dot")))){
    //   return getLatestPriceDot();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("doge")))){
    //   return getLatestPriceDoge();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("ltc")))){
    //   return getLatestPriceLtc();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("trx")))){
    //   return getLatestPriceTrx();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("bch")))){
    //   return getLatestPriceBch();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("algo")))){
    //   return getLatestPriceAlgo();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("xlm")))){
    //   return getLatestPriceXlm();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("zec")))){
    //   return getLatestPriceZec();
    // }
    // else if((keccak256(abi.encodePacked(input))) == (keccak256(abi.encodePacked("dash")))){
    //   return getLatestPriceDash();
    // }

    // Until here
  }
  

}