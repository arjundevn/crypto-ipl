import React, { Component } from "react";
import MindGamesContract from "./contracts/MindGames.json";
import MGTokenContract from "./contracts/MGToken.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, ownerAddress: "Loading...", numberOfUsers: "Loading...", numberOfOrders: "Loading...", web3: null, accounts: null, contract1: null, contract2: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      

      // Get the network details.
      const networkId = await web3.eth.net.getId();

      // Get the contract instance for main contract.
      const deployedNetwork1 = MindGamesContract.networks[networkId];
      const instance1 = new web3.eth.Contract(
        MindGamesContract.abi,
        deployedNetwork1 && deployedNetwork1.address,
      );

      // Get the contract instance for token contract.
      const deployedNetwork2 = MGTokenContract.networks[networkId];
      console.log(deployedNetwork2.address);
      const instance2 = new web3.eth.Contract(
        MGTokenContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

      //Comment below lines for testnet
      
      // const UsdtABIiOnMainnetMatic = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CHILD_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHILD_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEPOSITOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROOT_CHAIN_ID_BYTES","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"}],"name":"changeName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"bytes","name":"depositData","type":"bytes"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"address","name":"childChainManager","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

      // const UsdtAddressOnMainnetMatic = "0x7FFB3d637014488b63fb9858E279385685AFc1e2";

        
      // const instance2 = new web3.eth.Contract(UsdtABIiOnMainnetMatic);

      // instance2._address = UsdtAddressOnMainnetMatic;

      //Until here
        
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
        
      //contract1 is mindgames and contract2 is MGToken

      this.setState({ web3, accounts, contract1: instance1, contract2: instance2 }, this.runExample);
    } catch (error) {
      // Catch any errors for the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract1, contract2 } = this.state;
  
    // Get the value from the contract to prove it worked.
    const getOwnerAddress = await contract1.methods.owner().call();

    const getContractAddress = await contract1._address;
    
    const getnumberOfUsers = await contract1.methods.numOfUsers().call();
    
    const getnumberOfOrders = await contract1.methods.numOfOrders().call();

    const getnumberOfContests = await contract1.methods.numOfContests().call();

    const getMGTBalance = await contract2.methods.balanceOf(accounts[0]).call();

    const getMGTAllowance = await contract2.methods.allowance(accounts[0], getContractAddress).call();

    // Update state with the result.

    this.setState({ ContractAddress: getContractAddress });
    
    this.setState({ ownerAddress: getOwnerAddress });

    this.setState({ numberOfUsers: getnumberOfUsers });

    this.setState({ numberOfOrders: getnumberOfOrders });

    this.setState({ numberOfContests: getnumberOfContests });

    this.setState({ MGTBalance: getMGTBalance });

    this.setState({ MGTAllowance: getMGTAllowance });

  };

  registerUser = async () => {
    const { accounts, contract1 } = this.state;
    console.log(accounts)

    // Get the value from the contract to prove it worked.
    await contract1.methods.createNewUser(contract1._address).send({ from: accounts[0] });

    const getnumberOfUsers = await contract1.methods.numOfUsers().call();

    this.setState({ numberOfUsers: getnumberOfUsers });

  };

  checkUser = async () => {
    const { contract1 } = this.state;

    const ip = document.querySelector(".check-user").value;
    const op = document.querySelector(".check-user-result");
    const response = await contract1.methods.users(ip).call();

    if(response === "0"){
      op.innerHTML = "User does not exist with Mind Games";
    }
    else {
      op.innerHTML = "Congragulations!! User exists with Mind Games";
    }
  };

  increaseAllowance = async () => {
    const { accounts, contract1, contract2} = this.state;

    const contractAddress = contract1._address;
    const allowanceIncrease = (Number(document.querySelector(".increase-allowance").value)*10**18).toString();

    await contract2.methods.increaseAllowance(contractAddress, allowanceIncrease).send({ from: accounts[0] });

    const getMGTAllowance = await contract2.methods.allowance(accounts[0], contractAddress).call();

    this.setState({ MGTAllowance: getMGTAllowance });
  };

  decreaseAllowance = async () => {
    const { accounts, contract1, contract2} = this.state;

    const contractAddress = contract1._address;
    const allowanceDecrease = (Number(document.querySelector(".decrease-allowance").value)*10**18).toString();

    await contract2.methods.decreaseAllowance(contractAddress, allowanceDecrease).send({ from: accounts[0] });

    const getMGTAllowance = await contract2.methods.allowance(accounts[0], contractAddress).call();

    this.setState({ MGTAllowance: getMGTAllowance });
  };

  createContest = async () => {
    const { accounts, contract1} = this.state;

    const entryFee = (Number(document.querySelector(".entry-fee").value)*10**18).toString();
    
    await contract1.methods.createContest(entryFee).send({ from: accounts[0] });

    const getnumberOfContests = await contract1.methods.numOfContests().call();
  
    this.setState({ numberOfContests: getnumberOfContests });

  };

  startContest = async () => {
    const { accounts, contract1} = this.state;

    const startContestID = document.querySelector(".start-contest").value;

    await contract1.methods.startContest(startContestID).send({ from: accounts[0] });
  };


  endContest = async () => {
    const { accounts, contract1} = this.state;

    const startContestID = document.querySelector(".end-contest").value;

    await contract1.methods.endContest(startContestID).send({ from: accounts[0] });
  };

  createOrder = async () => {
    const { accounts, contract1, contract2 } = this.state;

    const contractAddress = contract1._address;
    const selectedCryptos = document.getElementsByName("cryp");
    
    const openOrderCrypto = [];
    const contestID = Number(document.querySelector(".input-contest-id").value);
    const entryFeeToPay = (Number(document.querySelector(".input-amount").value)*10**18).toString();

    for(var i=0;i<selectedCryptos.length;i++){
      if(selectedCryptos[i].checked) {
        openOrderCrypto.push(selectedCryptos[i].value)
      }
    }

    await contract1.methods.startOrder(entryFeeToPay, contestID, openOrderCrypto).send({ from: accounts[0] });

    const getnumberOfOrders = await contract1.methods.numOfOrders().call();

    this.setState({ numberOfOrders: getnumberOfOrders });

    const getMGTBalance = await contract2.methods.balanceOf(accounts[0]).call();
    
    this.setState({ MGTBalance: getMGTBalance });

    const getMGTAllowance = await contract2.methods.allowance(accounts[0], contractAddress).call();

    this.setState({ MGTAllowance: getMGTAllowance });

    alert("Please note down your Order ID: "+ (getnumberOfOrders));

  };

  endOrder = async () => {
    const { accounts, contract1 } = this.state;

    const ip = Number(document.querySelector(".end-order").value);
    console.log(ip);
    await contract1.methods.endOrder(ip).send({ from: accounts[0] });

  };

  viewOrder = async () => {
    const { contract1 } = this.state;

    const ip = document.querySelector(".view-order").value;
    const op = document.querySelector(".view-order-result");
    const response = await contract1.methods.viewOrder(ip).call();

    console.log(response)

    let orderStatus= "";

    response[2]? orderStatus = "Open": orderStatus = "Closed"

    op.innerHTML = "<p>This order is: <span>"+orderStatus+"</span></p><p>Order owner: <span>"+response[0]+"</span></p><p>Contest ID: <span>"+response[1]+"</span></p><p>Selected Crypto: <span>"+response[3]+"</span></p><p>Allocation points for respective crypto: <span>"+response[4].map((el)=>{ return el/10**10})+"</span></p>"  
  };

  viewContest = async () => {
    const { contract1 } = this.state;

    const ip = document.querySelector(".view-contest").value;
    const op = document.querySelector(".view-contest-result");
    // const crypto = await contract1.methods.allCrypto().call();
    const response = await contract1.methods.viewContest(ip).call();

    console.log(contract1.methods)

    let contestActivationStatus = "";

    let contestStartStatus = "";

    response[0]? contestActivationStatus = "Active": contestActivationStatus = "Inactive"

    response[1]? contestStartStatus = "Started": contestStartStatus = "Yet to start"

    const allCrypto = ["btc", "eth", "matic", "link"]

    op.innerHTML = "<p>Contest Activation Status: <span>"+contestActivationStatus+"</span></p><p>Contest Start Status: <span>"+contestStartStatus+"</span></p><p>Entry Fee: <span>"+Number(response[2])/10**18+"</span></p><p>Start Prices for "+allCrypto+": <span>"+response[3].map((el)=>{ return el/10**8})+"</span></p><p>End Prices for crypto : <span>"+response[4].map((el)=>{ return el/10**8})+"</span></p><p>Orders participated: <span>"+response[5]+"</span></p>"  
  };


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Mind Games</h1>
        <div>The Contract's address is <strong>{(this.state.ContractAddress)}</strong></div>
        <div>The owner's address is <strong>{(this.state.ownerAddress)}</strong></div>
        <div>Total Number of users: {(this.state.numberOfUsers)}</div>
        <div>Total Number of orders: {(this.state.numberOfOrders)}</div>
        <div>Total Number of contests: {(this.state.numberOfContests)}</div>
        <div>Your address: <strong>{(this.state.accounts)}</strong></div>
        <p>Please register your address in Mind Games. (Ignore if you have already)</p>
        <button onClick={this.registerUser}>Register (Pay Gas)</button>
        <p>If you are unsure of your registration, enter your address here</p>
        <div>
          <input type="text" className="check-user"></input>
          <button type="submit" onClick={this.checkUser}>Check (No Gas)</button>
          <p className="check-user-result"></p>
        </div>
        <div>Your MGT token balance: <strong>{(this.state.MGTBalance/10**18)}</strong></div>
        <div>Your allowance to Mind Games contract: <strong>{(this.state.MGTAllowance/10**18)}</strong></div>
        <div>
          <button type="submit" onClick={this.increaseAllowance}>Increase allowance by:</button>
          <input type="text" className="increase-allowance" placeholder="Amount in MGT"></input>
         </div>
         <div>
          <button type="submit" onClick={this.decreaseAllowance}>Decrease allowance by:</button>
          <input type="text" className="decrease-allowance" placeholder="Amount in MGT"></input>
         </div>
        <h2>Select your favourite cryptos and place an order</h2>
        <div className="cryptos">
          <input type="checkbox" id="cryp1" name="cryp" className="c cryp1" value="btc"/>
          <label htmlFor="cryp1">Bitcoin(BTC)</label>
          <input type="checkbox" id="cryp2" name="cryp" className="c cryp2" value="eth"/>
          <label htmlFor="cryp2">Ethereum(ETH)</label>
          <input type="checkbox" id="cryp3" name="cryp" className ="c cryp3" value="matic"/>
          <label htmlFor="cryp3">Polygon (Matic)</label>
          <input type="checkbox" id="cryp4" name="cryp" className="c cryp4" value="link"/>
          <label htmlFor="cryp4">Chainlink (Link)</label>

          {/* comment these lines below for testnet: */}
          
          {/* <input type="checkbox" id="cryp5" name="cryp" className="c cryp5" value="bnb"/>
          <label htmlFor="cryp5">Binance Coin(BNB)</label>
          <input type="checkbox" id="cryp6" name="cryp" className="c cryp6" value="xrp"/>
          <label htmlFor="cryp6">Ripple(XRP)</label>
          <input type="checkbox" id="cryp7" name="cryp" className ="c cryp7" value="ada"/>
          <label htmlFor="cryp7">Cardano(Ada)</label>
          <input type="checkbox" id="cryp8" name="cryp" className="c cryp8" value="sol"/>
          <label htmlFor="cryp8">Solana(Sol)</label>
          <input type="checkbox" id="cryp9" name="cryp" className="c cryp9" value="luna"/>
          <label htmlFor="cryp9">Terra(Luna)</label>
          <input type="checkbox" id="cryp10" name="cryp" className="c cryp10" value="dot"/>
          <label htmlFor="cryp10">Polkadot(Dot)</label>
          <input type="checkbox" id="cryp11" name="cryp" className ="c cryp11" value="doge"/>
          <label htmlFor="cryp11">Dogecoin(Doge)</label>
          <input type="checkbox" id="cryp12" name="cryp" className="c cryp12" value="ltc"/>
          <label htmlFor="cryp12">Litecoin(Ltc)</label>
          <input type="checkbox" id="cryp13" name="cryp" className="c cryp13" value="trx"/>
          <label htmlFor="cryp13">Tron(Trx)</label>
          <input type="checkbox" id="cryp14" name="cryp" className="c cryp14" value="bch"/>
          <label htmlFor="cryp14">Bitcoin Cash(BCH)</label>
          <input type="checkbox" id="cryp15" name="cryp" className ="c cryp15" value="algo"/>
          <label htmlFor="cryp15">Algorand(Algo)</label>
          <input type="checkbox" id="cryp16" name="cryp" className="c cryp16" value="xlm"/>
          <label htmlFor="cryp16">Stellar(Xlm)</label>
          <input type="checkbox" id="cryp17" name="cryp" className ="c cryp17" value="zec"/>
          <label htmlFor="cryp15">ZCash(Zec)</label>
          <input type="checkbox" id="cryp18" name="cryp" className="c cryp18" value="dash"/>
          <label htmlFor="cryp18">Dash(Dash)</label> */}

        </div>
        <div>
          <input type="number" className="input-contest-id" placeholder="Enter Contest ID"></input>
          <input type="number" className="input-amount" placeholder="Entry fee amount"></input>
        </div>
        <div><button type="submit" onClick={this.createOrder}>Create order (Pay Gas)</button></div>
        <h2>View Order details from the blockchain</h2>
        <div>
          <input type="text" className="view-order" placeholder="Enter Order ID"></input>
          <button type="submit" onClick={this.viewOrder}>Submit (No Gas)</button>
        </div>
        <div className="view-order-result">
        </div>
        <h2>View Contest details from the blockchain</h2>
        <div>
          <input type="text" className="view-contest" placeholder="Enter Contest ID"></input>
          <button type="submit" onClick={this.viewContest}>Submit (No Gas)</button>
        </div>
        <div className="view-contest-result">
        </div>
        <hr style={{
            height: 5
        }}
        />
        <h1>Admin Panel</h1>
        <h2>(Only Owner address can make these calls)</h2>
        <h2>Create Contest</h2>
          <div>
            <input type="text" className="entry-fee" placeholder="Specify entry fee"></input>
            <button type="submit" onClick={this.createContest}>Create</button>
          </div>
          <h2>Start Contest</h2>
          <div>
            <input type="text" className="start-contest" placeholder="Enter Contest ID"></input>
            <button type="submit" onClick={this.startContest}>Start</button>
          </div>
          <h2>End Contest</h2>
          <div>
            <input type="text" className="end-contest" placeholder="Enter Contest ID"></input>
            <button type="submit" onClick={this.endContest}>End</button>
          </div>
      </div>
    );
  }
}

export default App;
