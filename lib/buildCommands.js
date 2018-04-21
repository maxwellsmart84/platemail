"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPackage = buildPackage;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fs = _interopRequireDefault(require("fs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

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
    await promptSqlInformation();
  }

  cloneAndGitInit(repo, path);
  editPackageJsonAndInstall(cleanName, author, version);
  console.info(_chalk.default.yellow.bold('Installing Dependencies...'));

  _shelljs.default.exec('npm install');

  console.info(_chalk.default.green.bold('Finished! Thanks for using Platemail! Happy Coding!'));
  return process.exit(0);
}

function cloneAndGitInit(repo, path) {
  _shelljs.default.exec(`git clone ${repo} ${path}`);

  _shelljs.default.cd(path);

  _shelljs.default.rm('-rf', '.git');

  _shelljs.default.exec('git init');
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

async function promptSqlInformation() {
  const sqlEngineQuestion = [{
    type: 'list',
    name: 'sqlEngine',
    choices: [{
      name: 'MySql',
      value: 'mySql'
    }, {
      name: 'PostgreSQL',
      value: 'pg'
    }, {
      name: 'Sqlite3',
      value: 'sqlite3'
    }],
    message: _chalk.default.blue('Please select a SQL engine')
  }, {
    type: 'input',
    name: '',
    message: '',

    when(input) {
      return new Promise((res, rej) => {
        res(console.log(input));
      });
    }

  }];
  const sqlEngine = await _inquirer.default.prompt(sqlEngineQuestion);
  return sqlEngine;
}

function editPackageJsonAndInstall(name, author, version = '1.0.0', path = 'package.json') {
  const rawData = _fs.default.readFileSync(path);

  const parsedData = JSON.parse(rawData);
  const newData = { ...parsedData,
    name,
    author,
    version
  };
  const finishedFile = JSON.stringify(newData, null, 2);
  return _fs.default.writeFileSync(path, finishedFile);
}
//# sourceMappingURL=buildCommands.js.map