#!/usr/bin/env node

const [,, ...args] = process.argv;

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'commit') {
  console.log('TODO');
} else if (args[0] === 'branch') {
  console.log('TODO');
} else if (args[0] === 'merge') {
  console.log('TODO');
} else if (args[0] === 'checkout') {
  console.log('TODO');
} else {
  showHelp();
}

function showHelp() {
  console.log('FileFantasy - Version control for HUMANS');
  console.log('');
  console.log('Commands:');
  console.log('\tff commit');
  console.log('\tff branch');
  console.log('\tff merge');
  console.log('\tff checkout');
}
