const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'fatal achieve harbor equip width depend pill absorb push idle viable clutch',
  'https://rinkeby.infura.io/wcGF7mftIneil1uy1RJl'
);
const web3 = new Web3(provider);

// wrapping code in a deploy function so that we can use async/await
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('attempting to deploy from account', accounts[0]);

  // result is an instance of the contract
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] }) // added '0x' b/c failing otherwise w HDWalletProvider0.0.5
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to:', result.options.address);
};
deploy();