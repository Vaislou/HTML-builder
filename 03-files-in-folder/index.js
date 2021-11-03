const fs = require('fs');
const path = require('path');

const url = path.join(__dirname, 'secret-folder');

const inside = fs.readdir(url, { withFileTypes: true }, (err, arr) => {
    arr.forEach(item => {
        fs.stat(`${url}/${item.name}`, (err, e) => {
            if (e.isFile()) {
                console.log(`${item.name.split('.').join(' - ')} - ${e.size / 1000}kb`);
            }
        });
    });
});
