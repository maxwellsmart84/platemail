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
  console.log(options);
  const { nodeExpress, nodeSql, nodeNosql, nodeCli, } = options;
  let repo;
  const answers = await promptUserInformation();
  const cleanName = answers.name.toString().trim();
  const path = dir ? `${dir}/${cleanName}` : `./${cleanName}`;

  if (nodeExpress) repo = 'https://github.com/maxwellsmart84/nodeApiPlate.git';
  if (nodeSql) repo = '';
  if (nodeNosql) repo = '';
  if (nodeCli) repo = '';

  if (!sh.which('git')) {
    console.log('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git');
  }
  sh.exec(`git clone ${repo} ${path}`, (data, stdout, stderr) => {
    if (stderr) {
      console.error(`Error: ${stderr}`);
    }
  });
  sh.cd(path);
  sh.rm('-rf', '.git');
  sh.exec('git init', (data, stdout, stderr) => {
    console.log('DATA', data);
    console.log('STDOUT', stdout);
    console.log('STDERR', stderr);
  });
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


// function editPackageJson(name, author, version = '1.0.0', path = './package.json') {
//   const rawData = fs.readFileSync(JSON.parse(path));
//   const newData = { ...rawData, name, author, version, };

//   fs.writeFile(path, JSON.stringify(newData, null, 2), (err) => {
//     if (err) {
//       console.log('cant write file');
//     }
//     console.log(`writing to file:${path}`);
//   });
//   return null;
// }

