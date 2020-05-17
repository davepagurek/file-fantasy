const fs = require('fs');
const sf = require('./suffixes');

function mergeFiles(args) {
	//we need 2 arguments
	if (args.length != 3) {
		console.log("Error: You gotta write it like so:\nff merge file1.ext file2.ext");
		return;
	}
	
	const srcFile = args[1];
	const destFile = args[2];

	//Determine mashup filename
	const newFile = sf.inc(destFile).split(".")[0] + "-" + srcFile.split(".")[0] + "." + destFile.split(".")[1];

	//copy dest file to new file
	fs.copyFileSync(destFile, newFile, (err) => {
		if (err) throw err;
	});

	//append src file to new file
	const data = fs.readFileSync(srcFile, (err) => {
		if (err) throw err;
	})
	fs.appendFileSync(newFile, data, (err) => {
		if (err) throw err;
	});

	console.log("🤯 Merged to create: " + newFile);

}

module.exports = mergeFiles;