"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptNoSqlInformation = promptNoSqlInformation;

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

var _sqlCommands = require("./sqlCommands");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function promptNoSqlInformation() {
  const noSqlEngineQuestion = [{
    type: 'list',
    name: 'noSqlEngine',
    choices: [{
      name: 'Mongo DB',
      value: 'mongodb'
    }, {
      name: 'Couch DB',
      value: 'couchdb'
    }, {
      name: 'Dynamo DB',
      value: 'dynamodb'
    }],
    message: _chalk.default.blue('Please select a No SQL engine')
  }];
  const {
    noSqlEngine
  } = await _inquirer.default.prompt(noSqlEngineQuestion);
  return { ...noSqlEngine,
    ...(await (0, _sqlCommands.promptDBConnectionInformation)())
  };
}
//# sourceMappingURL=noSqlCommands.js.map