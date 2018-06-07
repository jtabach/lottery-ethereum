// used for making assertions about tests -  a node dependency
const assert = require('assert');
const ganache = require('ganache-cli');
// Web3 is capitalized because it is a constructor - will be making instances of the web3 library
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox Contract', () => {
  it('depoys a contract', () => {
    console.log(inbox);
  });
})