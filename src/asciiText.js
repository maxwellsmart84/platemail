import figlet from 'figlet';


export function createHeader() {
  return figlet.textSync('Platemail', { font: 'Caligraphy', });
}
