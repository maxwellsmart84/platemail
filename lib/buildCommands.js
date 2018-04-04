"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildProject;

var _shelljs = _interopRequireDefault(require("shelljs"));

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
  if (opts.type === 'node.express') {
    await _shelljs.default.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git');
  }

  return console.log('WIP');
}
//# sourceMappingURL=buildCommands.js.map