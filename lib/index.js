#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _buildCommands = _interopRequireDefault(require("./buildCommands"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.1.0').description('A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!').usage('<option> [dir] - defaults to current directory').option('-ne, --node-express [dir]', 'build node express').option('-ncli, --node-cli [dir]', 'build node cli starter').option('-nsql, --node-sql [dir]', 'build node with express and knex.js').option('-nnosql, --node-nosql [dir]', 'build node with express and mongoDB '); // .command('list', 'list all available boilerplates', { isDefault: true });


_commander.default.parse(process.argv);

const NO_ARGS = _commander.default.args.length === 0;

if (NO_ARGS) {
  _commander.default.outputHelp();
}
//# sourceMappingURL=index.js.map