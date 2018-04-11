import figlet from 'figlet';
import chalk from 'chalk';


export function createHeader() {
  return figlet.textSync('Platemail', { font: 'Caligraphy', });
}
