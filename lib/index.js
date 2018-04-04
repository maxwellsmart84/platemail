#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version('0.1.0').description('A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!').usage('build <boilerplate> [dir]') // .command('list', 'list all available boilerplates', { isDefault: true })
.command('build <name>', 'load a boilerplate').alias('b');

_commander.default.parse(process.argv);
//# sourceMappingURL=index.js.map