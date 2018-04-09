"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildProject;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from 'fs';
// async function editPackageJson(package) {
// }
// async function getPackage(opts = {}) {
//   if (opts.type === 'node.express') {
//     await sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git');
//   }
//   return console.log('WIP');
// }
function buildProject({
  type,
  name,
  author
}) {
  return getPackage({
    type,
    name,
    author
  });
}

async function getPackage(opts = {}) {
  if (!_shelljs.default.which(git)) {
    console.log('Sorry this program requires git');
  }

  if (opts.type === 'node.express') {
    _shelljs.default.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git', (data, stdout, stderr) => {
      console.log(data);
      console.log(stdout);
      console.log(stderr);
    });
  }

  return console.log('WIP');
}

function editPackageJson(name, author, version = '1.0.0', path = './package.json') {
  const rawData = _fs.default.readFileSync(JSON.parse(path));

  const newData = { ...rawData,
    name,
    author,
    version
  };

  _fs.default.writeFile(path, JSON.stringify(newData, null, 2), err => {
    if (err) {
      console.log('cant write file');
    }

    console.log(`writing to file:${path}`);
  });

  return null;
}
//# sourceMappingURL=buildCommands.js.map