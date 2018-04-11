#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _buildCommands = require("./buildCommands");

var _asciiText = require("./asciiText");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const header = (0, _asciiText.createHeader)();

_commander.default.version('0.1.0').description(`${header}
    A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!`).usage('build <option> [dir] - defaults to current directory.  Use -h with any command to see available options.').command('build [dir]').option('-e, --node-express', 'build node express').option('--cli, --node-cli', 'build node cli starter').option('--sql, --node-sql', 'build node with express and knex.js').option('--nosql, --node-nosql', 'build node with express and mongoDB ').action((dir, cmd) => {
  (0, _buildCommands.buildPackage)(dir, cmd);
});

_commander.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander.default.outputHelp();
}
//# sourceMappingURL=index.js.map