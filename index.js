import * as program from 'commander';

program
  .version('0.1.0')
  .description('A cli built with nodeJS to manage your boilerplate code.  Put on your platemail and get coding!');


program.on('--help', () => {
  console.log('  Examples');
});

program.command(//command name <arg1> <arg2> <arg3>)
  .alias('b')
  .description('Build a new project')
  .action({// arg1, arg2, arg3 })

