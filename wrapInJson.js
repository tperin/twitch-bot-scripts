const fs = require('fs');
const path = require('path');

// Grab the command-line arguments for output and JSON file names
const args = process.argv.slice(2);
const [outputFileArg, jsonFileArg] = args;

const outputFile = path.resolve(__dirname, outputFileArg);
const jsonFile = path.resolve(__dirname, jsonFileArg);

fs.readFile(outputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the output file:', err);
    return;
  }

  const jsonData = JSON.stringify({ script: data });
  fs.writeFile(jsonFile, jsonData, (err) => {
    if (err) {
      console.error('Error writing the JSON file:', err);
      return;
    }
    console.log(`Wrapped output in JSON format successfully into ${jsonFile}`);
  });
});
