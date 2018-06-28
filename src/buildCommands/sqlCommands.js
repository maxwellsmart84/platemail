import inquirer from 'inquirer';
import chalk from 'chalk';

export async function promptSqlInformation() {
  const sqlEngineQuestion = [
    {
      type: 'list',
      name: 'sqlEngine',
      choices: [
        {
          name: 'PostgreSQL',
          value: 'pg',
        },
        {
          name: 'MySQL',
          value: 'mysql',
        },
        {
          name: 'MySQL2',
          value: 'mysql2',
        },
        {
          name: 'mariaSQL',
          value: 'mariasql',
        },
        {
          name: 'MSSQL',
          value: 'mssql',
        },
        {
          name: 'SQLite3',
          value: 'sqlite3',
        },
        {
          name: 'Oracle',
          value: 'oracle',
        }
      ],
      message: chalk.blue('Please select a SQL engine'),
    }
  ];
  const { sqlEngine } = await inquirer.prompt(sqlEngineQuestion);
  if (sqlEngine == 'sqlite3') {
    const { dbName } = await promptSqlite();
    return { dbName, sqlEngine, dbHost: `./db/${dbName}.sqlite` };
  }
  return { sqlEngine, ...await promptSqlConectionInformation() };
}

// TODO: Figure out best way to edit dotEnv files(fs or dotEnv module?...)
// function editSqlEnvs(data) {
// }

async function promptSqlConectionInformation() {
  const questions = [
    {
      type: 'input',
      name: 'dbUser',
      message: chalk.green('What is the SQL username?'),
      default: 'root',
    },
    {
      type: 'password',
      name: 'dbPass',
      message: chalk.green('SQL User password'),
      default: 'password',
    },
    {
      type: 'input',
      name: 'dbName',
      message: chalk.green('What is the database name?'),
      default: 'TestDB',
    },
    {
      type: 'input',
      name: 'dbHost',
      message: chalk.green('What is the host address of your sql server?'),
      default: '127.0.0.1',
    }
  ];
  const answers = await inquirer.prompt(questions);
  return answers;
}

function promptSqlite() {
  const question = {
    type: 'input',
    name: 'dbName',
    message: chalk.orange('What is the name of your sqlite database?'),
  };
  return inquirer.prompt(question);
}
