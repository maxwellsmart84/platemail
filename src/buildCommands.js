import sh from 'shelljs';
import fs from 'fs';
import prompt from 'prompt';
// async function editPackageJson(package) {

// }

// async function getPackage(opts = {}) {
//   if (opts.type === 'node.express') {
//     await sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git');
//   }
//   return console.log('WIP');
// }


export default function buildPackage(opts = {}) {
  if (!sh.which(git)) {
    console.log('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git');
  }
  console.log(opts);
  if (opts.type === 'node.express') {
    sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git', (data, stdout, stderr) => {
      console.log(data);
      console.log(stdout);
      console.log(stderr);
    });
  }
  return console.log('WIP');
}

function promptUserInformation() {

}


function editPackageJson(name, author, version = '1.0.0', path = './package.json') {
  const rawData = fs.readFileSync(JSON.parse(path));
  const newData = { ...rawData, name, author, version, };

  fs.writeFile(path, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.log('cant write file');
    }
    console.log(`writing to file:${path}`);
  });
  return null;
}

