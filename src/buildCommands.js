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

// eslint-disable-next-line
export async function buildPackage(dir, options) {
  const { nodeExpress, nodeSql, nodeNosql, nodeCli, } = options;
  let repo;
  const { name, author, version, } = await promptUserInformation();
  const cleanName = name.toString().trim();
  const path = dir ? `${dir}/${cleanName}` : `${cleanName}`;

  if (nodeExpress) repo = 'https://github.com/maxwellsmart84/nodeApiPlate.git';
  if (nodeSql) repo = '';
  if (nodeNosql) repo = '';
  if (nodeCli) repo = '';

  if (!sh.which('git')) {
    console.error('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git');
  }
  sh.exec(`git clone ${repo} ${path}`);
  sh.cd(path);
  sh.rm('-rf', '.git');
  sh.exec('git init');
  editPackageJsonAndInstall(cleanName, author, version);
  console.log('Installing Dependencies...');
  sh.exec('npm install');
  console.log('Finished! Thanks for using Platemail! Happy Coding!');
  return process.exit(0);
}


async function promptUserInformation() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is this project\'s name? (required)',
      validate(input) {
        return new Promise((res, rej) => {
          if (typeof input === 'string' && input.length !== 0) res(true);
          else rej(console.log(' Input required'));
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
    }
  ];
  const answers = await inquirer.prompt(questions);
  return answers;
}


function editPackageJsonAndInstall(name, author, version = '1.0.0', path = 'package.json') {
  const rawData = fs.readFileSync(path);
  const parsedData = JSON.parse(rawData);
  const newData = { ...parsedData, name, author, version, };
  const finishedFile = JSON.stringify(newData, null, 2);
  return fs.writeFileSync(path, finishedFile);
}

