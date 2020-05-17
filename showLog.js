const fs = require('fs');
const { execSync } = require('child_process');

const { getTrackedFiles, getHighestVersion } = require('./fileUtils');
const { parts, inc, dec } = require('./suffixes');

const dir =  process.cwd();

function letterDist(f1, f2) {
  if (f1.length !== f2.length) {
    return Infinity;
  }

  // Compute sum of squared differences between character codes
  let dist = 0;
  for (let i = 0; i < f1.length; i++) {
    const c1 = f1.charCodeAt(i);
    const c2 = f2.charCodeAt(i);
    dist += (c1-c2)*(c1-c2);
  }
  return dist;
}

function findBranchParent(file, allFiles) {
  let closest = null;
  let minDist = Infinity;

  const base = parts(file)[0][0];
  allFiles.forEach(other => {
    if (file === other) return;

    // If the basename is the same, they're the same branch. Ignore.
    if (base === parts(other)[0][0]) return;

    const dist = letterDist(file, other);
    if (dist < minDist) {
      minDist = dist;
      closest = other;
    }
  });

  return closest;
}

function showLog() {
  const files = new Set(getTrackedFiles());
  const graphEdges = [];

  // id to file
  const graphIds = {};

  // file to id
  const fileIds = {};

  // file to stats
  const fileStats = {};

  let nextId = 0;

  // Connect children in each branch
  files.forEach(f => {
    let child = getHighestVersion(f);
    while (true) {
      graphIds[`id${nextId}`] = child;
      fileIds[child] = `id${nextId}`;
      fileStats[child] = fs.statSync(child);
      nextId++;

      const parent = dec(child);
      if (fs.existsSync(parent)) {
        graphEdges.push([`id${nextId}`, `id${nextId-1}`, 'child']);
        child = parent;
      } else {
        break;
      }
    }
  });

  // Find branches
  files.forEach(f => {
    let child = getHighestVersion(f);
    while (true) {
      const branchParent = findBranchParent(child, Object.keys(fileIds));
      if (branchParent &&
          // Parent came before child
          fileStats[branchParent].birthtime < fileStats[child].birthtime &&
          // Child has no parent of its own
          !fileIds[dec(child)]) {
        graphEdges.push([fileIds[branchParent], fileIds[child], 'branch']);
      }

      const parent = dec(child);
      if (fs.existsSync(parent)) {
        child = parent;
      } else {
        break;
      }
    }
  });

  const stats = id => {
    return fileStats[graphIds[id]].birthtime.toLocaleDateString('en-US');
  };

  const graphTxt = [
    'graph TD',

    // Define an id for each file, with the filename in the box
    ...Object.keys(graphIds).map(id =>
      `${id}["${graphIds[id]}<br />Created ${stats(id)}"]`),

    // Add an arrow from parent to child
    ...graphEdges.map(([from, to, type]) => {
      if (type === 'child') {
        return `${from} --> ${to}`;
      } else {
        return `${from} -.-> ${to}`;
      }
    })
  ].join('\n');

  const tmpFile = '____ff_log.mmd';
  const outFile = '_FF_LOG.pdf';
  fs.writeFileSync(tmpFile, graphTxt);
  execSync(`(cd ${__dirname}; npx mmdc -i "${dir}/${tmpFile}" -o "${dir}/${outFile}")`);
  fs.unlinkSync(tmpFile);

  console.log(`Your version history is in ${outFile}.`);
}

module.exports = showLog;
