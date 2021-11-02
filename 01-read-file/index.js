const fs = require("fs");
const path = require("path");

let url = path.join(__dirname,'text.txt');
let stream = new fs.ReadStream(url, {encoding: 'utf-8'});

stream.on('readable', () => {
    let data = stream.read();
    console.log(data);
});