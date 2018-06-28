import sh from 'shelljs';
import fs, { writeFileSync } from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { promptSqlInformation } from './sqlCommands';

export async function buildPackage(dir, options) {
  let repo;
  let sqlInfo;
  const { nodeExpress, nodeSql, nodeNosql, nodeCli } = options;
  const { name, author, version } = await promptUserInformation();
  const cleanName = name.toString().trim();
  const path = dir ? `${dir}/${cleanName}` : `${cleanName}`;

  if (nodeExpress) repo = 'https://github.com/maxwellsmart84/nodeApiPlate.git';
  if (nodeSql) repo = 'https://github.com/maxwellsmart84/nodeCliPlate.git';
  if (nodeNosql) repo = '';
  if (nodeCli) repo = '';

  if (!sh.which('git')) {
    console.error(chalk.red.bold('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git'));
  }
  if (nodeSql) {
    sqlInfo = await promptSqlInformation();
  }
  try {
    await sh.exec(`git clone ${repo} ${path}`);
  } catch (e) {
    return console.error(`Error cloning repo: ${e}`);
  }
  const { sqlEngine, dbName, dbHost, dbUser, dbPass } = sqlInfo;
  sh.cd(path);
  sh.rm('-rf', '.git');
  sh.exec('git init');
  editPackageJsonAndInstall({ name: cleanName, author, version, sqlEngine });
  editEnvFile({ sqlEngine, dbPass, dbName, dbHost, dbUser });
  console.info(chalk.yellow.bold('Installing Dependencies...'));
  sh.exec('npm install');
  console.info(chalk.green.bold('Finished! Thanks for using Platemail! Happy Coding!'));
  return process.exit(0);
}


async function promptUserInformation() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: chalk.green('What is this project\'s name?', chalk.red.bold('--required')),
      validate(input) {
        return new Promise((res, rej) => {
          if (typeof input === 'string' && input.length !== 0) res(true);
          else rej(console.log(chalk.red.bold(' Input required')));
        });
      },
    },
    {
      type: 'input',
      name: 'author',
      message: chalk.green('What is the author\'s name?'),
      default: '',
    },
    {
      type: 'input',
      name: 'version',
      message: chalk.green('What is the version number?'),
      default: '1.0.0',
    }
  ];
  const answers = await inquirer.prompt(questions);
  return answers;
}

function editPackageJsonAndInstall({ name = '', author = '', version = '1.0.0', sqlEngine = undefined } = {}) {
  const rawData = fs.readFileSync('package.json');
  const packageJSON = JSON.parse(rawData);
  // filter out other engines
  let { dependencies } = packageJSON;
  const dependencyKeys = Object.keys(dependencies);
  const newDependencies = [...sqlEngine, 'express', 'bodyparser', 'dotenv', 'knex'];

  dependencies = newDependencies
    .reduce((obj, key) => ({ ...obj, [key]: dependencyKeys[key] }), {});

  const newData = { ...packageJSON, name, author, version, dependencies };
  const finishedFile = JSON.stringify(newData, null, 2);
  return fs.writeFileSync('package.json', finishedFile);
}

function editEnvFile({ sqlEngine = '', dbName = '', dbHost = '', dbUser = '', dbPass = '' } = {}) {
  const envFile = `
  PORT=8080,
  SQL_CLIENT=${sqlEngine}
  DB_HOST=${dbHost}
  DB_USER=${dbUser}
  DB_PASS=${dbPass}
  DB_NAME=${dbName}`;

  return writeFileSync('./.env', envFile);
}
