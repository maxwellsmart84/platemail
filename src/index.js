#!/usr/bin/env node
import program from 'commander';
import figlet from 'figlet';
import { buildPackage } from './buildCommands';

const header = figlet.textSync('Platemail', { font: 'ogre', });

program
  .version('0.1.0')
  .description(`${header}
    A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!`)
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
