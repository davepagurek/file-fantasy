#!/usr/bin/env node

const [,, ...args] = process.argv;

const showLog = require('./showLog');
const commitFiles = require('./commitFiles');
const branchFiles = require('./branchFiles');

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'commit') {
  commitFiles(args);
} else if (args[0] === 'branch') {
  branchFiles(args);
} else if (args[0] === 'merge') {
  console.log('TODO');
} else if (args[0] === 'checkout') {
  console.log('TODO');
} else if (args[0] === 'log') {
  showLog();
} else {
  showHelp();
}

function showHelp() {
  console.log('FileFantasy - Version control for HUMANS');
  console.log('');
  console.log('Commands:');
  console.log('\tff commit [file1, file2...]: Make a backup of whole directory or just a few files');
  console.log('\tff branch [file1, file2...]: Make a kinda similar version of a file to... mess around on');
  console.log('\tff merge');
  console.log('\tff checkout');
  console.log('\tff log: Take a good long look at what you\'ve done (in PDF format).');
}
