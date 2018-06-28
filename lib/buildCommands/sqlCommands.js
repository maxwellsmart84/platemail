"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptSqlInformation = promptSqlInformation;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function promptSqlInformation() {
  const sqlEngineQuestion = [{
    type: 'list',
    name: 'sqlEngine',
    choices: [{
      name: 'PostgreSQL',
      value: 'pg'
    }, {
      name: 'MySQL',
      value: 'mysql'
    }, {
      name: 'MySQL2',
      value: 'mysql2'
    }, {
      name: 'mariaSQL',
      value: 'mariasql'
    }, {
      name: 'MSSQL',
      value: 'mssql'
    }, {
      name: 'SQLite3',
      value: 'sqlite3'
    }, {
      name: 'Oracle',
      value: 'oracle'
    }],
    message: _chalk.default.blue('Please select a SQL engine')
  }];
  const {
    sqlEngine
  } = await _inquirer.default.prompt(sqlEngineQuestion);
  if (sqlEngine === 'sqlite3') return { ...(await promptSqlite()),
    sqlEngine
  };
  return promptSqlConectionInformation(sqlEngine); // Edit env file
} // TODO: Figure out best way to edit dotEnv files(fs or dotEnv module?...)
// function editSqlEnvs(data) {
// }


async function promptSqlConectionInformation(sqlEngine) {
  const questions = [{
    type: 'input',
    name: 'sqlUser',
    message: _chalk.default.blue('What is the SQL username?'),
    default: 'root'
  }, {
    type: 'password',
    name: 'password',
    message: _chalk.default.blue('SQL User password'),
    default: 'password'
  }, {
    type: 'input',
    name: 'databaseName',
    message: _chalk.default.blue('What is the database name?'),
    default: ''
  }, {
    type: 'input',
    name: 'host',
    message: _chalk.default.blue('What is the host address of your sql server?'),
    default: '127.0.0.1'
  }];
  const answers = await _inquirer.default.prompt(questions);

  if (sqlEngine === 'pg') {
    const valQuestion = {
      type: 'input',
      name: 'version',
      message: _chalk.default.blue('What version of Postgres?')
    };
    return { ...answers,
      ...(await _inquirer.default.prompt(valQuestion))
    };
  }

  return answers;
}

function promptSqlite() {
  const question = {
    type: 'input',
    name: 'filepath',
    message: 'What is the filepath to your sqlite database?'
  };
  return _inquirer.default.prompt(question);
}
//# sourceMappingURL=sqlCommands.js.map