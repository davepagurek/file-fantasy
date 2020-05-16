const fs = require('fs');
const sf = require('./suffixes');
const { getTrackedFiles, getHighestVersion, getSlightlyDifferentName } = require('./fileUtils');

function branchFiles(args) {
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
}

module.exports = branchFiles;
