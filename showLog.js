const fs = require('fs');
const { execSync } = require('child_process');

const { getTrackedFiles, getHighestVersion } = require('./fileUtils');
const { dec } = require('./suffixes');

const dir =  process.cwd();

function showLog() {
  const files = new Set(getTrackedFiles());
  const graphEdges = [];
  const graphIds = {};

  let nextId = 0;

  files.forEach(f => {
    let child = getHighestVersion(f);
    while (true) {
      graphIds[`id${nextId}`] = child;
      nextId++;
      const parent = dec(child);
      if (fs.existsSync(parent)) {
        graphEdges.push([`id${nextId}`, `id${nextId-1}`]);
        child = parent;
      } else {
        break;
      }
    }
  });

  const graphTxt = [
    'graph TD',

    // Define an id for each file, with the filename in the box
    ...Object.keys(graphIds).map(id =>
      `${id}[${graphIds[id]}]`),

    // Add an arrow from parent to child
    ...graphEdges.map(([from, to]) =>
      `${from} --> ${to}`)
  ].join('\n')

  const tmpFile = '____ff_log.mmd';
  const outFile = '_FF_LOG.pdf';
  fs.writeFileSync(tmpFile, graphTxt);
  execSync(`(cd ${__dirname}; npx mmdc -i "${dir}/${tmpFile}" -o "${dir}/${outFile}")`);
  fs.unlinkSync(tmpFile);

  console.log(`Your version history is in ${outFile}.`);
}

module.exports = showLog;
