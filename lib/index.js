#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _buildCommands = require("./buildCommands");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.1.0').description('A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!').usage('<option> [dir] - defaults to current directory').option('-ne, --node-express [dir]', 'build node express', _buildCommands.buildPackage).option('-ncli, --node-cli <node-cli> [dir]', 'build node cli starter', _buildCommands.buildPackage).option('-nsql, --node-sql <node-sql> [dir]', 'build node with express and knex.js', _buildCommands.buildPackage).option('-nnosql, --node-nosql <node-nosql> [dir]', 'build node with express and mongoDB ', _buildCommands.buildPackage); // .command('list', 'list all available boilerplates', { isDefault: true });


_commander.default.parse(process.argv);

const NO_ARGS = _commander.default.args.length === 0;

if (NO_ARGS) {
  _commander.default.outputHelp();
}
//# sourceMappingURL=index.js.map