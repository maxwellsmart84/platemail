import sh from 'shelljs';
import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function buildPackage(dir, options) {
  const { nodeExpress, nodeSql, nodeNosql, nodeCli, } = options;
  let repo;
  const { name, author, version, } = await promptUserInformation();
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
    await promptSqlInformation();
  }
  cloneAndGitInit(repo, path);
  editPackageJsonAndInstall(cleanName, author, version);
  console.info(chalk.yellow.bold('Installing Dependencies...'));
  sh.exec('npm install');
  console.info(chalk.green.bold('Finished! Thanks for using Platemail! Happy Coding!'));
  return process.exit(0);
}

function cloneAndGitInit(repo, path) {
  sh.exec(`git clone ${repo} ${path}`);
  sh.cd(path);
  sh.rm('-rf', '.git');
  sh.exec('git init');
}


async function promptUserInformation() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: chalk.blue('What is this project\'s name?', chalk.red.bold('--required')),
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
      message: chalk.blue('What is the author\'s name?'),
      default: '',
    },
    {
      type: 'input',
      name: 'version',
      message: chalk.blue('What is the version number?'),
      default: '1.0.0',
    }
  ];
  const answers = await inquirer.prompt(questions);
  return answers;
}

async function promptSqlInformation() {
  const sqlEngineQuestion = [
    {
      type: 'list',
      name: 'sqlEngine',
      choices: [
        {
          name: 'MySql',
          value: 'mySql',
        },
        {
          name: 'PostgreSQL',
          value: 'pg',
        },
        {
          name: 'Sqlite3',
          value: 'sqlite3',
        }
      ],
      message: chalk.blue('Please select a SQL engine'),
    }
  ];
  const sqlEngine = await inquirer.prompt(sqlEngineQuestion);
  if (sqlEngine === 'sqlite3') return { ...await promptSqlite(), sqlEngine, };
  return promptSqlConectionInformation(sqlEngine);
  // Edit env file
}

// TODO: Figure out best way to edit dotEnv files(fs or dotEnv module?...)
// function editSqlEnvs(data) {
// }

async function promptSqlConectionInformation(sqlEngine) {
  const questions = [
    {
      type: 'input',
      name: 'sqlUser',
      message: chalk.blue('What is the SQL username?'),
      default: 'root',
    },
    {
      type: 'password',
      name: 'password',
      message: chalk.blue('SQL User password'),
      default: 'password',
    },
    {
      type: 'input',
      name: 'databaseName',
      message: chalk.blue('What is the database name?'),
      default: '',
    },
    {
      type: 'input',
      name: 'host',
      message: chalk.blue('What is the host address of your sql server?'),
      default: '127.0.0.1',
    }
  ];
  const answers = await inquirer.prompt(questions);
  const valQuestion = {
    type: 'input',
    name: 'version',
    message: chalk.blue('What version of Postgres?'),
  };
  if (sqlEngine === 'pg') return { ...answers, ...await inquirer.prompt(valQuestion), };
  return answers;
}

function promptSqlite() {
  const question = {
    type: 'input',
    name: 'filepath',
    message: 'What is the filepath to your sqlite database?',
  };
  return inquirer.prompt(question);
}


function editPackageJsonAndInstall(name, author, version = '1.0.0', path = 'package.json') {
  const rawData = fs.readFileSync(path);
  const parsedData = JSON.parse(rawData);
  const newData = { ...parsedData, name, author, version, };
  const finishedFile = JSON.stringify(newData, null, 2);
  return fs.writeFileSync(path, finishedFile);
}

