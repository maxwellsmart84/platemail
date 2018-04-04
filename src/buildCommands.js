import sh from 'shelljs';
// import fs from 'fs';

// async function editPackageJson(package) {

// }

// async function getPackage(opts = {}) {
//   if (opts.type === 'node.express') {
//     await sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git');
//   }
//   return console.log('WIP');
// }


export default function buildProject({ type, name, author }) {
  return getPackage({ type, name, author });
}

async function getPackage(opts = {}) {
  if (opts.type === 'node.express') {
    await sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git');
  }
  return console.log('WIP');
}

