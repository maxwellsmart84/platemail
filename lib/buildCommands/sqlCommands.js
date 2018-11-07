"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptSqlInformation = promptSqlInformation;
exports.promptDBConnectionInformation = promptDBConnectionInformation;

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

  if (sqlEngine === 'sqlite3') {
    const {
      dbName
    } = await promptSqlite();
    return {
      dbName,
      sqlEngine,
      dbHost: `./db/${dbName}.sqlite`
    };
  }

  return {
    sqlEngine,
    ...(await promptDBConnectionInformation())
  };
}

async function promptDBConnectionInformation() {
  const questions = [{
    type: 'input',
    name: 'dbUser',
    message: _chalk.default.green('What is the database username?'),
    default: 'root'
  }, {
    type: 'password',
    name: 'dbPass',
    message: _chalk.default.green('What is the database password'),
    default: 'password'
  }, {
    type: 'input',
    name: 'dbName',
    message: _chalk.default.green('What is the database name?'),
    default: 'TestDB'
  }, {
    type: 'input',
    name: 'dbHost',
    message: _chalk.default.green('What is the host address of your database server?'),
    default: '127.0.0.1'
  }];
  const answers = await _inquirer.default.prompt(questions);
  return answers;
}

function promptSqlite() {
  const question = {
    type: 'input',
    name: 'dbName',
    message: _chalk.default.orange('What is the name of your SQLite database?')
  };
  return _inquirer.default.prompt(question);
}
//# sourceMappingURL=sqlCommands.js.map