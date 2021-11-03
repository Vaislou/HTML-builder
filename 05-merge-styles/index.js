const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'styles');
const urlDist = path.join(__dirname, 'project-dist');

fs.readdir(url, (err, arr) => {
    fs.unlink(`${urlDist}/bundle.css`, () => {
        console.log('removed');
    });
    arr.forEach(item => {
        if (item.split('.')[1] == 'css') {
            let stream = fs.createReadStream(`${url}/${item}`, 'utf-8');
            stream.on('data', (e) => {
                fs.appendFile(`${urlDist}/bundle.css`, e, () => console.log('appended'));
            });
        }
    });
});