const { settings } = require('./suffixes.js');

const fs = require('fs');
const dir =  process.cwd();

const BRANCH_WEIRDNESS_FACTOR = 0.3;

function getTrackedFiles() {
  let files = new Array();
  //console.log('Current directory: ' + dir);
  fs.readdirSync(dir).forEach(file => {
   
    let fileNameNoExtension = file.split(".")[0];
    let possibleVal = fileNameNoExtension.split(settings.separator)[0];
    if(!files.includes(possibleVal) && possibleVal !=''){ //ignore DS_Store
      files.push(possibleVal);
      //console.log(possibleVal + " Added");
    }
  });
  return files;
}

function getHighestVersion(filename) {
  let highestVerFile = "";
  let oldSuffix = "";
  //get all files with the name as a prefix
  fs.readdirSync(dir).forEach(file => {
    if (file.startsWith(filename)) {
      //add it if we don't have one yet 
      
      let newSuffix = "";
      if (file.split(settings.separator).length > 1) {
        newSuffix = file.split(settings.separator)[1];
      }
      
      if (newSuffix > oldSuffix || highestVerFile === "") {
        highestVerFile = file;
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

module.exports = { getTrackedFiles, getHighestVersion, getSlightlyDifferentName };
