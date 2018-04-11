#!/usr/bin/env node
import program from 'commander';
import { buildPackage } from './buildCommands';
import { createHeader } from './asciiText';

const header = createHeader();

program
  .version('0.1.0')
  .description(`${header}
    A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!`)
  .usage('build <option> [dir] - defaults to current directory.  Use -h with any command to see available options.')
  .command('build [dir]')
  .option('-e, --node-express', 'build node express')
  .option('--cli, --node-cli', 'build node cli starter')
  .option('--sql, --node-sql', 'build node with express and knex.js')
  .option('--nosql, --node-nosql', 'build node with express and mongoDB ')
  .action((dir, cmd) => {
    buildPackage(dir, cmd);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
