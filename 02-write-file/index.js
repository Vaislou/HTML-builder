const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'text.txt');

const writeFile = fs.createWriteStream(url);
process.stdin.pipe(writeFile);
process.stdin.resume();