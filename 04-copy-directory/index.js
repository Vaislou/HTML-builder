const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'files-copy');

fs.mkdir(url, { recursive: true }, () => {
    fs.readdir(path.join(__dirname, 'files'), (err, arr) => {
        arr.forEach((item) => {
            fs.copyFile(path.join(__dirname, `files/${item}`), path.join(__dirname, `files-copy/${item}`), () => {
                console.log(`File ${item} - copied`);
            });
            fs.readdir(url, (error, array) => {
                array.forEach((copyItem) => {
                    if (!arr.includes(copyItem)) {
                        fs.unlink(`${url}/${copyItem}`, () => {
                            console.log('removed');
                        });
                    }
                });
            });
        });
    });
});



