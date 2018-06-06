// using path gives us cross platform compatiblity (windows or unix based)
const path = require('path');
// fs - used to read in the contents of a file
const fs = require('fs');
const solc = require('solc');

// __dirname is a constant defined by node and is always set to the current working directory
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// exports compiled contract code
module.exports = solc.compile(source, 1).contracts[':Inbox'];