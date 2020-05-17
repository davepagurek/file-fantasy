#!/usr/bin/env node

const [,, ...args] = process.argv;

const showLog = require('./showLog');
const commitFiles = require('./commitFiles');
const branchFiles = require('./branchFiles');
const checkThisOut = require('./checkThisOut');
const mergeFiles = require('./mergeFiles');

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'commit') {
  commitFiles(args);
} else if (args[0] === 'branch') {
  branchFiles(args);
} else if (args[0] === 'merge') {
  mergeFiles(args);
} else if (args[0] === 'checkout') {
  checkThisOut();
} else if (args[0] === 'log') {
  showLog();
} else {
  showHelp();
}

function showHelp() {
  console.log('FileFantasy - Version control for HUMANS');
  console.log('');
  console.log('Commands:');
  console.log('\tff commit [file1, file2...]: Make a 💾 backup of whole directory or just a few files');
  console.log('\tff branch [file1, file2...]: Make a 📑 kinda similar version of a file to mess around on');
  console.log('\tff merge file1 file2: Smush file1 into file2. Leaves... some... evidence 😳');
  console.log('\tff checkout: It wouldn\'t be a git killer without a 🎉 checkout 🎉 command.');
  console.log('\tff log: Take a good long look 🔍 at what you\'ve done (in PDF 📝 format).');
}
