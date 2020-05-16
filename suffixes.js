const settings = {
  separator: "_",
  suffixes: [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    //"Copy",
    //"Copy(2)",
    //"Copy(3)",
    //"Final",
    //"Final2",
    //"REALfinal",
    //"asdf",
    //"hjkl",
    //"pleasebefinal"
  ]
};

function parts(filename) {
  // TODO handle dots in the name
  const [name, ext] = filename.split('.');
  return [name.split(settings.separator), `.${ext}`];
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

module.exports = { settings, parts, dec, inc };
