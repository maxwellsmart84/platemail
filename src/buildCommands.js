import sh from 'shelljs';
import fs from 'fs';
import inquirer from 'inquirer';
// async function editPackageJson(package) {

// }

// async function getPackage(opts = {}) {
//   if (opts.type === 'node.express') {
//     await sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git');
//   }
//   return console.log('WIP');
//


export default async function buildPackage(dir = './', options) {
  const { nodeExpress, nodeSql, nodeNosql, nodeCli, } = options;
  let repo = '';
  if (nodeExpress) repo = '';
  if (nodeSql) repo = '';
  if (nodeNosql) repo = '';
  if (nodeCli) repo = '';

  if (!sh.which(git)) {
    console.log('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git');
  }
  console.log(opts, dir);
  const answers = await promptUserInformation();
  console.log(answers);
  // if (opts.type === 'node.express') {
  //   sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git', (data, stdout, stderr) => {
  //     console.log(data);
  //     console.log(stdout);
  //     console.log(stderr);
  //   });
  // }
  return console.log('WIP');
}


async function promptUserInformation() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is this project\'s name? (required)',
      validate() {
        return new Promise((res, rej) => {
          if (typeof input === 'string' && input.length !== 0) res();
          else rej(console.log('Input required'));
        });
      },
    },
    {
      type: 'input',
      name: 'author',
      message: 'What is the author\'s name?',
      default: '',
    },
    {
      type: 'input',
      name: 'version',
      message: 'What is the version number? (defaults to 1.0.0)',
      default: '1.0.0',
    },
    { type: '', }
  ];
  Promise.resolve(inquirer.prompt(questions))
    .then(console.log('CHOICES', questions));
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

