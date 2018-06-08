// used for making assertions about tests -  a node dependency
const assert = require('assert');
const ganache = require('ganache-cli');
// Web3 is capitalized because it is a constructor - will be making instances of the web3 library
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';
const UPDATED_STRING = 'bye';

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox Contract', () => {
  it('depoys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change the message', async () => {
    // no need to verify if transaction was successful, test suite will throw error if fail
    await inbox.methods.setMessage(UPDATED_STRING).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, UPDATED_STRING);
  });
})