const fs = require("fs");
const path = require("path");

let url = path.join(__dirname,'text.txt');
let stream = fs.createReadStream(url, 'utf-8');

stream.on('data', (e) => {
    console.log(e);
});