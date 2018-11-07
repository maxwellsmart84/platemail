import inquirer from 'inquirer';
import chalk from 'chalk';
import { promptDBConnectionInformation } from './sqlCommands';

export async function promptNoSqlInformation() {
  const noSqlEngineQuestion = [
    {
      type: 'list',
      name: 'noSqlEngine',
      choices: [
        {
          name: 'Mongo DB',
          value: 'mongodb',
        },
        {
          name: 'Couch DB',
          value: 'couchdb',
        },
        {
          name: 'Dynamo DB',
          value: 'dynamodb',
        }
      ],
      message: chalk.blue('Please select a No SQL engine'),
    }
  ];
  const { noSqlEngine } = await inquirer.prompt(noSqlEngineQuestion);
  return { ...noSqlEngine, ...await promptDBConnectionInformation() };
}
