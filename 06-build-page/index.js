const fs = require('fs');
const path = require('path');
const url = path.join(__dirname);

fs.mkdir(`${url}/project-dist`, { recursive: true }, () => {
    fs.readdir(`${url}/styles`, (err, arr) => {
        fs.unlink(`${url}/project-dist/style.css`, () => {});
        arr.forEach(item => {
            if (item.split('.')[1] == 'css') {
                let stream = fs.createReadStream(`${url}/styles/${item}`, 'utf-8');
                stream.on('data', (e) => {
                    fs.appendFile(`${url}/project-dist/style.css`, e, () => {});
                    fs.appendFile(`${url}/project-dist/style.css`, '\n', () => {});
                });
            }
        });
    });
});

fs.unlink(`${url}/project-dist/index.html`, () => {
    fs.copyFile(`${url}/template.html`, `${url}/project-dist/index.html`, () => {});
});

fs.readdir(`${url}/components`, (error, array) => {
    let miniArr = {};
    array.forEach(elem => {
        if (elem.split('.')[1] == 'html') {
            fs.readFile(`${url}/components/${elem}`, 'utf-8', (er, data) => {
                let name = elem.split('.')[0];
                miniArr[name] = data;
            });
        }
    });

    setTimeout(() => {
        fs.readFile(`${url}/project-dist/index.html`, 'utf-8', (e, d) => {
            for (let [key, value] of Object.entries(miniArr)) {
                d = d.replace(`{{${key}}}`, value);
                fs.writeFile(`${url}/project-dist/index.html`, d, () => {});
            }
        });
    }, 4000);
});

const assetsUrl = path.join(__dirname, 'assets');

fs.readdir(assetsUrl, { withFileTypes: true }, (err, arr) => {
    arr.forEach(item => {
        fs.stat(`${assetsUrl}/${item.name}`, (er, e) => {
            if (!e.isFile()) {
                fs.mkdir(`${url}/project-dist/assets/${item.name}`, { recursive: true }, () => {
                    fs.readdir(`${assetsUrl}/${item.name}`, { withFileTypes: true }, (e, a) => {
                        a.forEach(i => {
                            fs.copyFile(`${assetsUrl}/${item.name}/${i.name}`, `${url}/project-dist/assets/${item.name}/${i.name}`, (er) => {});
                        });
                    });
                });
            }
        });
    });
});

// Когда будете проверять это задание, пожалуйста, в случае неудачной сборки index.html с первого раза - запустите сборку еще раз
// Тоже самое касается и когда скопируете test-files. Сначала удалите dist, а потом запустите сборку. Если с первого раз index соберется криво, запустите пожалуйста сборку еще раз
// Спасибо








