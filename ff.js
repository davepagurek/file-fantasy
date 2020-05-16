#!/usr/bin/env node

const [,, ...args] = process.argv;
const dir =  process.cwd();
const fs = require('fs');
const sf = require('./suffixes');
const SEPERATOR = "_";

const showLog = require('./showLog');
const { getTrackedFiles, getHighestVersion } = require('./fileUtils');

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'commit') {
  let filelist;
  //if we have no file specified
  if (args.length == 1) {
    filelist = getTrackedFiles();
  } else {
    filelist = args.slice(1, args.length);
  }

  console.log("found files to \'track\':")
  console.log(filelist);
  filelist.forEach(filename => {
    console.log(filename);
    //copy all files and bump version
    //find highest version
    let fileToCopy = getHighestVersion(filename);
    newName = sf.inc(fileToCopy);

    //create the doc
    fs.copyFileSync(fileToCopy, newName, (err) => {
      if (err) throw err;
    });
    console.log(fileToCopy + " was copied to " + newName + '\n');
  });

  //console.log('TODO');
} else if (args[0] === 'branch') {
  console.log('TODO');
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
  console.log('\tff commit');
  console.log('\tff branch');
  console.log('\tff merge');
  console.log('\tff checkout');
  console.log('\tff log');
}
