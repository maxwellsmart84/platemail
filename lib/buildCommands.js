"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildPackage;

var _shelljs = _interopRequireDefault(require("shelljs"));

var _fs = _interopRequireDefault(require("fs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// async function editPackageJson(package) {
// }
// async function getPackage(opts = {}) {
//   if (opts.type === 'node.express') {
//     await sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git');
//   }
//   return console.log('WIP');
// }
const questions = [{
  type: 'input',
  name: 'name',
  message: 'What is this project\'s name? (required)',

  validate() {
    return new Promise((res, rej) => {
      if (typeof input === 'string' && input.length !== 0) res();else rej(console.log('Input required'));
    });
  }

}, {
  type: 'input',
  name: 'author',
  message: 'What is the author\'s name?',
  default: ''
}, {
  type: 'input',
  name: 'version',
  message: 'What is the version number? (defaults to 1.0.0)',
  default: '1.0.0'
}, {
  type: ''
}];

async function buildPackage(opts = {}) {
  console.log('GETTING HERRE');

  if (!_shelljs.default.which(git)) {
    console.log('Sorry, this program requires git, go here for more information https://git-scm.com/book/en/v2/Getting-Started-Installing-Git');
  }

  console.log(opts);
  const answers = await promptUserInformation();
  console.log(answers); // if (opts.type === 'node.express') {
  //   sh.exec('git clone https://github.com/maxwellsmart84/nodeApiPlate.git', (data, stdout, stderr) => {
  //     console.log(data);
  //     console.log(stdout);
  //     console.log(stderr);
  //   });
  // }

  return console.log('WIP');
}

async function promptUserInformation() {
  Promise.resolve(_inquirer.default.prompt(questions)).then(console.log('CHOICES', questions));
}

function editPackageJson(name, author, version = '1.0.0', path = './package.json') {
  const rawData = _fs.default.readFileSync(JSON.parse(path));

  const newData = { ...rawData,
    name,
    author,
    version
  };

  _fs.default.writeFile(path, JSON.stringify(newData, null, 2), err => {
    if (err) {
      console.log('cant write file');
    }

    console.log(`writing to file:${path}`);
  });

  return null;
}
//# sourceMappingURL=buildCommands.js.map