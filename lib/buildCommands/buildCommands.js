"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPackage = buildPackage;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fs = _interopRequireWildcard(require("fs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

var _sqlCommands = require("./sqlCommands");

var _noSqlCommands = require("./noSqlCommands");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function buildPackage(dir, options) {
  let repo;
  let sqlInfo;
  let noSqlInfo;
  const {
    nodeExpress,
    nodeSql,
    nodeNoSql,
    nodeCli
  } = options;
  const {
    name,
    author,
    version
  } = await promptUserInformation();
  const cleanName = name.toString().trim();
  const path = dir ? `${dir}/${cleanName}` : `${cleanName}`;
  if (nodeExpress) repo = 'https://github.com/maxwellsmart84/nodeApiPlate.git';
  if (nodeSql) repo = 'https://github.com/maxwellsmart84/nodeApiSql.git';
  if (nodeNoSql) repo = '';
  if (nodeCli) repo = 'https://github.com/maxwellsmart84/nodeCliPlate.git';

  if (!_shelljs.default.which('git')) {
    console.error(_chalk.default.red.bold('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git'));
  }

  if (nodeSql) {
    sqlInfo = await (0, _sqlCommands.promptSqlInformation)();
  }

  if (nodeNoSql) {
    noSqlInfo = await (0, _noSqlCommands.promptNoSqlInformation)();
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
    version
  });
  console.info(_chalk.default.yellow.bold('Installing Dependencies...'));

  _shelljs.default.exec('npm install', {
    silent: true
  });

  if (nodeNoSql) {
    const {
      sqlEngine,
      dbName,
      dbHost,
      dbUser,
      dbPass
    } = noSqlInfo;
    editEnvFile({
      dbPass,
      dbName,
      dbHost,
      dbUser,
      sqlEngine
    });

    _shelljs.default.exec(`npm install ${sqlEngine} --save`, {
      silent: true
    });
  }

  if (nodeSql) {
    const {
      sqlEngine,
      dbName,
      dbHost,
      dbUser,
      dbPass
    } = sqlInfo;
    editEnvFile({
      dbPass,
      dbName,
      dbHost,
      dbUser,
      sqlEngine
    });

    _shelljs.default.exec(`npm install ${sqlEngine} --save`, {
      silent: true
    });
  }

  console.info(_chalk.default.green.bold('Finished! Thanks for using Platemail! Happy Coding!'));
  return process.exit(0);
}

async function promptUserInformation() {
  const questions = [{
    type: 'input',
    name: 'name',
    message: _chalk.default.green('What is this project\'s name?', _chalk.default.red.bold('--required')),

    validate(input) {
      return new Promise((res, rej) => {
        if (typeof input === 'string' && input.length !== 0) res(true);else rej(console.log(_chalk.default.red.bold(' Input required')));
      });
    }

  }, {
    type: 'input',
    name: 'author',
    message: _chalk.default.green('What is the author\'s name?'),
    default: ''
  }, {
    type: 'input',
    name: 'version',
    message: _chalk.default.green('What is the version number?'),
    default: '1.0.0'
  }];
  const answers = await _inquirer.default.prompt(questions);
  return answers;
}

function editPackageJsonAndInstall({
  name = '',
  author = '',
  version = '1.0.0'
} = {}) {
  const rawData = _fs.default.readFileSync('package.json');

  const packageJSON = JSON.parse(rawData);
  const newData = { ...packageJSON,
    name,
    author,
    version
  };
  const finishedFile = JSON.stringify(newData, null, 2);
  return _fs.default.writeFileSync('package.json', finishedFile);
}

function editEnvFile({
  sqlEngine = '',
  dbName = '',
  dbHost = '',
  dbUser = '',
  dbPass = ''
} = {}) {
  const envFile = `
  PORT=8080
  SQL_CLIENT=${sqlEngine}
  DB_HOST=${dbHost}
  DB_USER=${dbUser}
  DB_PASS=${dbPass}
  DB_NAME=${dbName}`;
  return (0, _fs.writeFileSync)('./.env', envFile);
}
//# sourceMappingURL=buildCommands.js.map