"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPackage = buildPackage;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fs = _interopRequireDefault(require("fs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

var _sqlCommands = require("./sqlCommands");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function buildPackage(dir, options) {
  const {
    nodeExpress,
    nodeSql,
    nodeNosql,
    nodeCli
  } = options;
  let repo;
  const {
    name,
    author,
    version
  } = await promptUserInformation();
  const cleanName = name.toString().trim();
  const path = dir ? `${dir}/${cleanName}` : `${cleanName}`;
  if (nodeExpress) repo = 'https://github.com/maxwellsmart84/nodeApiPlate.git';
  if (nodeSql) repo = 'https://github.com/maxwellsmart84/nodeCliPlate.git';
  if (nodeNosql) repo = '';
  if (nodeCli) repo = '';

  if (!_shelljs.default.which('git')) {
    console.error(_chalk.default.red.bold('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git'));
  }

  if (nodeSql) {
    const {
      sqlEngine,
      sqlConnectionSettings
    } = await (0, _sqlCommands.promptSqlInformation)();
  }

  try {
    await _shelljs.default.exec(`git clone ${repo} ${path}`);
  } catch (e) {
    return console.error(`Error cloning repo: ${e}`);
  }

  _shelljs.default.cd(path);

  _shelljs.default.rm('-rf', '.git');

  _shelljs.default.exec('git init');

  editPackageJsonAndInstall({
    name: cleanName,
    author,
    version,
    sqlEngine
  });
  console.info(_chalk.default.yellow.bold('Installing Dependencies...'));

  _shelljs.default.exec('npm install');

  console.info(_chalk.default.green.bold('Finished! Thanks for using Platemail! Happy Coding!'));
  return process.exit(0);
}

async function promptUserInformation() {
  const questions = [{
    type: 'input',
    name: 'name',
    message: _chalk.default.blue('What is this project\'s name?', _chalk.default.red.bold('--required')),

    validate(input) {
      return new Promise((res, rej) => {
        if (typeof input === 'string' && input.length !== 0) res(true);else rej(console.log(_chalk.default.red.bold(' Input required')));
      });
    }

  }, {
    type: 'input',
    name: 'author',
    message: _chalk.default.blue('What is the author\'s name?'),
    default: ''
  }, {
    type: 'input',
    name: 'version',
    message: _chalk.default.blue('What is the version number?'),
    default: '1.0.0'
  }];
  const answers = await _inquirer.default.prompt(questions);
  return answers;
}

function editPackageJsonAndInstall({
  name = '',
  author = '',
  version = '1.0.0',
  sqlEngine = undefined
} = {}) {
  const rawData = _fs.default.readFileSync('package.json');

  const packageJSON = JSON.parse(rawData); // filter out other engines

  let {
    dependencies
  } = packageJSON;
  const dependencyKeys = Object.keys(dependencies);
  const newDependencies = [...sqlEngine, 'express', 'bodyparser', 'dotenv', 'knex'];
  dependencies = newDependencies.reduce((obj, key) => ({ ...obj,
    [key]: dependencyKeys[key]
  }), {});
  const newData = { ...packageJSON,
    name,
    author,
    version,
    dependencies
  };
  const finishedFile = JSON.stringify(newData, null, 2);
  return _fs.default.writeFileSync('package.json', finishedFile);
}
//# sourceMappingURL=buildCommands.js.map