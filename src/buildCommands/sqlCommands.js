import inquirer from 'inquirer';
import chalk from 'chalk';

export async function promptSqlInformation() {
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
  const { sqlEngine, } = await inquirer.prompt(sqlEngineQuestion);
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
  if (sqlEngine === 'pg') {
    const valQuestion = {
      type: 'input',
      name: 'version',
      message: chalk.blue('What version of Postgres?'),
    };
    return { ...answers, ...await inquirer.prompt(valQuestion), };
  }
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
