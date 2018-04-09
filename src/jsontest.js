const fs = require('fs');


const file = '../package.json';
const rawData = fs.readFileSync(file);
const packageJson = JSON.parse(rawData);
packageJson.name = 'new value';

fs.writeFile(file, JSON.stringify(packageJson, null, 2), (err) => {
  if (err) {
    console.log('cant write file');
  }
  console.log(`writing to file:${file}`);
});
