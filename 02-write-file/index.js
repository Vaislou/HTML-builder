const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'text.txt');

const writeFile = fs.createWriteStream(url);

console.log('Enter your message');
process.stdin.pipe(writeFile);
process.stdin.resume();

process.on('SIGINT', () => {
    process.stdout.write('Bye');
    process.exit();
});

process.stdin.on('data', data => {
    let a = data.toString().trim();
    if (a === 'exit') {
        process.stdout.write('Bye');
        process.exit();
    }
});

