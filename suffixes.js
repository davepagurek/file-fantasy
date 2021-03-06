const settings = {
  separator: "_",
  mergeSeparator: "-",
  suffixes: [
    //"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    "Copy",
    "Copy(2)",
    "Copy(3)",
    "Final",
    "Final2",
    "REALfinal",
    "asdf",
    "hjkl",
    "pleasebefinal"
  ]
};

function parts(filename) {
  // TODO handle dots in the name
  const [fullname, ext] = filename.split('.');
  let name = fullname;
  let mergedFrom = null;
  const mergeIdx = fullname.indexOf(settings.mergeSeparator);
  if (mergeIdx >= 0) {
    name = fullname.slice(0, mergeIdx);
    mergedFrom = fullname.slice(mergeIdx+1);
  }
  return [name.split(settings.separator), `.${ext}`, mergedFrom];
}

function gt(suffixA, suffixB) {
  const numsA = suffixA.map(str => settings.suffixes.indexOf(str));
  const numsB = suffixB.map(str => settings.suffixes.indexOf(str));
  const maxLen = Math.max(suffixA.length, suffixB.length);

  // Left pad with 0s
  while (numsA.length < maxLen) numsA.unshift(0);
  while (numsB.length < maxLen) numsB.unshift(0);

  for (let place = 0; place < maxLen; place++) {
    if (numsA[place] > numsB[place]) {
      return true;
    } else if (numsA[place] < numsB[place]) {
      return false;
    }
  }
  return false;
}

function inc(filename) {
  const [[base, ...suffix], ext] = parts(filename);
  const nums = suffix.map(str => settings.suffixes.indexOf(str));
  nums.reverse();

  if (nums.length === 0) {
    nums.push(0);
  }

  // Increment
  nums[0]++;
  for (let place = 0; place < nums.length; place++) {
    while (nums[place] >= settings.suffixes.length) {
      nums[place] -= settings.suffixes.length;
      if (place === nums.length-1) {
        nums.push(1);
      } else {
        nums[place+1]++;
      }
    }
  }

  nums.reverse();
  new_suffix = nums.map(i => settings.suffixes[i]);
  return [base, ...new_suffix].join(settings.separator) + ext;
}

function dec(filename) {
  const [[base, ...suffix], ext] = parts(filename);
  const nums = suffix.map(str => settings.suffixes.indexOf(str));
  nums.reverse();

  nums[0]--;
  let negative = false;
  for (let place = 0; place < nums.length; place++) {
    if (negative) continue;
    while (nums[place] < 0) {
      nums[place] += settings.suffixes.length;
      if (place === nums.length-1) {
        negative = true;
        break;
      } else {
        nums[place+1]--;
      }
    }
  }

  if (!negative) {
    while (nums[nums.length-1] === 0) {
      nums.pop();
    }
    nums.reverse();
    new_suffix = nums.map(i => settings.suffixes[i]);
    return [base, ...new_suffix].join(settings.separator) + ext;
  } else {
    return base + ext;
  }
}

module.exports = { settings, parts, dec, inc, gt };
