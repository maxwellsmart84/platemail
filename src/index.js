#!/usr/bin/env node
import program from 'commander';
import { buildPackage } from './buildCommands';

program
  .version('0.1.0')
  .description('A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!')
  .usage('<option> [dir] - defaults to current directory')
  .option('-ne, --node-express [dir]', 'build node express', buildPackage)
  .option('-ncli, --node-cli <node-cli> [dir]', 'build node cli starter', buildPackage)
  .option('-nsql, --node-sql <node-sql> [dir]', 'build node with express and knex.js', buildPackage)
  .option('-nnosql, --node-nosql <node-nosql> [dir]', 'build node with express and mongoDB ', buildPackage);
// .command('list', 'list all available boilerplates', { isDefault: true });

program.parse(process.argv);
const NO_ARGS = program.args.length === 0;

if (NO_ARGS) {
  program.outputHelp();
}

