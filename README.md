# Mind Games

## Metamask

Metamask is a pre-requisite for this project. You can downloaded it [here.](https://metamask.io/download)

* Once downloaded, click on import wallet function and insert the passphrase given in the .secret file.

* This will import the owner's account and its respective balance of matic testnet tokens.

* The above two steps have to be done to get owner priveleges. The Dapp can be tested otherwise as well.

* Polygon testnet tokens can be requested from the [Polygon faucet](https://faucet.polygon.technology/)

* Ensure metamask is connected to polygon's mumbai testnet. [Instructions](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask)

---
## Running the app
* Install all the dependencies of the repository. (There are dependencies in the parent folder as well as **client** directory).

* Within the client directory , run command:
```bash
npm run start
```
---
## Smart Contracts

There are 2 smart contracts deployed on the polygon mumbai chain:

1) *Contract1*--> **MindGames.sol**: Contains game logic.

2) *Contract2*-->**MGToken.sol**: Contains ERC20 token logic.

Both the above files can be found at **/contracts** folder.

A JSON mapping of these deployed contracts can be found in **client/src/contracts**
* { } Mindgames.json
* { } MGToken.json
---
## Interacting with the App
Decentralized apps or Dapps store the data on smart contracts and this data can be accessed with the help of a javascript library called ***Web3.js***

Web3 exposes a certain set of APIs with which we can interact with the smart contract. There are 2 ways of interacting with the data on the smart contract:

1) **Read**: It is absolutely free to read data from the blockchain and hence upon invoking this API, there is no prompt from metamask.The syntax for calling this API would be:

await contract1.methods.***Function Name(arguments)***.call()
Example:

```javascript
await contract1.methods.viewOrder(ip).call(); //App.js
```

> Note: **contract1** can be replaced by **contract2** to call the APIs of the token contract


2) **Write**: To write data into the blockchain, it would cost some amount in the form of gas fees. Bigger the data to be pushed, higher is the gas fees. Upon invoking this API, the user would get a prompt from metamask asking permission to spend the gas fees. The transaction would successfully get recorded on the blockchain only if the user *Approves* this transaction on his/her wallet. The syntax for calling this API would be:

await contract1.methods.***Function Name(arguments)***.send({ from: accounts[0] })

Example:

```javascript
await contract2.methods.createOrder(stakedAmount, contestID, openOrderCrypto).send({ from: accounts[0] }); //App.js
```

## List of APIs:

### Contract 1: Read functions

1) owner() *//returns the owner's address*
2) numOfUsers() *//returns the total number of users registered*
3) users(address) *// returns the ID of the registered user. Returns 0 if the user is unregistered*
4) numOfOrders() *//returns the total number of orders*
5) viewOrder(orderID) *//returns all details of an individual order*
6) balanceOf(address) *// returns the MGT token balance of the address*

### Contract 1: Write functions
1) createNewUser() *//registers the metamask address as a new user*
2) endOrder(OrderID) *// Ends the order and stores the data feed prices (Can only be done by the owner*
3) withdraw(x) *//Withdraws "x" amount of MGT tokens*

### Contract 2: Write functions
1) createOrder(stakedAmount, contestID, array of the Cryptos selected) *//transfer the stakedAmount of MGT tokens to the contract account and creates a new order by fetching data feed prices from oracles*

> Note: There are more functions to this list,but did not include them to avoid complexities.
