#!/usr/bin/env node

const [,, ...args] = process.argv;
const fs = require('fs');
const sf = require('./suffixes');

const showLog = require('./showLog');
const { getTrackedFiles, getHighestVersion, getSlightlyDifferentName } = require('./fileUtils');

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
  let filelist;
  //if we have no file specified
  if (args.length == 1) {
    filelist = getTrackedFiles();
  } else {
    filelist = args.slice(1, args.length);
  }

  filelist.forEach(file => {

    //give each one a different-ish name
    let fileToCopy = getHighestVersion(file);
    const kindaNewName = getSlightlyDifferentName(fileToCopy);
    console.log("file: "+ fileToCopy + " | newish file: " + kindaNewName);
    //create the doc
    fs.copyFileSync(fileToCopy, kindaNewName, (err) => {
      if (err) throw err;
    });
    console.log(fileToCopy + " was copied to " + kindaNewName + '\n');
  });
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
