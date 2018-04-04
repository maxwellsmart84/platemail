#!/usr/bin/env node

import program from 'commander';

program
  .version('0.1.0')
  .description('A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!')
  .usage('build <boilerplate> [dir]')
  .option('-ne, --node-express [dir]', 'build node express')
  .option('-ncli, --node-cli [dir]', 'build node cli starter')
  .option('-nsql', '--node-sql [dir]', 'build node with express and knex.js')
  .option('-nnosql, --node-nosql [dir]', 'build node with express and mongoDB ');
// .command('list', 'list all available boilerplates', { isDefault: true });

program.parse(process.argv);

