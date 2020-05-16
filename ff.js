#!/usr/bin/env node

const [,, ...args] = process.argv;
const dir =  process.cwd();
const fs = require('fs');
const SEPERATOR = "_";

if (args.length === 0) {
  showHelp();
} else if (args[0] === 'commit') {
  console.log("found files to \'track\':")
  getTrackedFiles().forEach(filename => {
    console.log(filename);
    //copy all files and bump version
    //find highest version
    let fileToCopy = getHighestVersion(filename);
    let nameNoExt = fileToCopy.split(".")[0];
    let ext = fileToCopy.split(".")[1];
    parts = nameNoExt.split(SEPERATOR);
    let newName = "";
    if (parts.length > 1) {
      newName = parts[0] + SEPERATOR + (parseInt(parts[1]) + 1) + "." + ext;
    } else {
      newName = parts[0] + SEPERATOR + "1" + "." + ext;
    }

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
  console.log('TODO');
} else {
  showHelp();
}

function getHighestVersion(filename) {
  let highestVerFile = "";
  let oldSuffix = "";
  //get all files with the name as a prefix
  fs.readdirSync(dir).forEach(file => {
    if (file.startsWith(filename)) {
      //add it if we don't have one yet 
      
      let newSuffix = "";
      if (file.split(SEPERATOR).length > 1) {
        newSuffix = file.split(SEPERATOR)[1];
      }
      
      if (newSuffix > oldSuffix || highestVerFile === "") {
        highestVerFile = file;
      }
      
    }
  });
  return highestVerFile;
}

function getTrackedFiles() {
  let files = new Array();
  //console.log('Current directory: ' + dir);
  fs.readdirSync(dir).forEach(file => {
   
    let fileNameNoExtension = file.split(".")[0];
    let possibleVal = fileNameNoExtension.split(SEPERATOR)[0];
    if(!files.includes(possibleVal)){
      files.push(possibleVal);
      //console.log(possibleVal + " Added");
    }
  });
  return files;
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
