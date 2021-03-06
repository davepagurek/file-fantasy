const { parts, gt, settings } = require('./suffixes.js');

const fs = require('fs');
const dir =  process.cwd();

const BRANCH_WEIRDNESS_FACTOR = 0.3;

function getTrackedFiles() {
  let files = new Array();
  //console.log('Current directory: ' + dir);
  fs.readdirSync(dir).forEach(file => {
   
    const [[possibleVal, ...suffix], ext, mergedFrom] = parts(file);
    if(!files.includes(possibleVal) && possibleVal !=''){ //ignore DS_Store
      files.push(possibleVal);
      //console.log(possibleVal + " Added");
    }
  });
  return files;
}

function findFileWithMerge(file) {
  const [[possibleVal, ...suffix], ext, mergedFrom] = parts(file);
  let mergedVersion = null;
  return fs.readdirSync(dir).find(file =>
    file.startsWith(`${possibleVal}_${suffix.join(settings.separator)}-`));
}

function getHighestVersion(filename) {
  let highestVerFile = "";
  let oldSuffix = "";
  //get all files with the name as a prefix
  fs.readdirSync(dir).forEach(file => {
    if (file.startsWith(filename)) {
      const [[base, ...suffix], ext] = parts(file);

      //add it if we don't have one yet 
      if (highestVerFile === "" || gt(suffix, oldSuffix)) {
        highestVerFile = file;
        oldSuffix = suffix;
      }
    }
  });
  return highestVerFile;
}

function getSlightlyDifferentName(inputString){
  let firstPart = inputString.split('.')[0];
  let suffix = inputString.split('.')[1];

  let newName = new Array();
  for(let i=0;i<firstPart.length;i++){
    if (Math.random() < BRANCH_WEIRDNESS_FACTOR){
      newName.push(nextChar(firstPart.charAt(i)));
    } else {
      newName.push(firstPart.charAt(i));
    }
  }
  return newName.join('') + '.' + suffix;
}

function nextChar(c) {
  if (c === 'z' || c === '.' || c === '_') {
    return c;
  }
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

module.exports = { getTrackedFiles, getHighestVersion, getSlightlyDifferentName, findFileWithMerge };
