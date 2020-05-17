const dir =  process.cwd();
const fs = require('fs');

function checkThisOut() {
    filesInDir = fs.readdirSync(dir);
    constFileOfTheDay = filesInDir[Math.floor(Math.random() * filesInDir.length)];
    console.log("👀 The file of the day is " + constFileOfTheDay + "! Check it out!");
}

module.exports = checkThisOut;