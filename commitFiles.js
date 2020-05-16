const fs = require('fs');
const sf = require('./suffixes');
const { getTrackedFiles, getHighestVersion, getSlightlyDifferentName } = require('./fileUtils');

function commitFiles(args){
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
}

module.exports = commitFiles;

