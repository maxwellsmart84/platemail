#!/usr/bin/env node
import program from 'commander';
// import fs from 'fs';
// import shell from 'shelljs';

// const questions = [
//   {
//     type: 'input',
//     name: 'type',
//     message: 'What type of node project? Use build -n -l to list available options',
//   },
//   {
//     type: 'input',
//     name: 'name',
//     message: 'What is your project name?',
//   },
//   {
//     type: 'input',
//     name: 'author',
//     message: 'What is the author name?',
//   },
// ];


program;
// .option('-ne, --node-express [dir]', 'build node express')
// .option('-ncli, --node-cli [dir]', 'build node cli starter')
// .option('-nsql', '--node-sql [dir]', 'build node with express and knex.js')
// .option('-nnosql, --node-nosql [dir]', 'build node with express and mongoDB ');
// const plates = program.args;

// if (plates.length === 0) {
//   console.error('option required');
//   process.exit(1);
// }

// function cloneAndInit(dir) {
//   if (!fs.existsSync(dir)
// }

if (program.nodeExpress) {
  console.log('YOU DID IT!');
  // shell.exec('git clone --template= ./ ');
}
