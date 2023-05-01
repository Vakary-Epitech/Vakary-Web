const fs = require('fs');
const path = require('path');

const directoryPath = './dist/js';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  const jsFiles = files.filter(file => path.extname(file) === '.js');

  jsFiles.forEach(file => {
    const filePath = path.join(directoryPath, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', filePath, err);
            return;
        }
        const modifiedData = data.replace(/p\+"img\//g, 'p+"2024/vakary/img/');
        fs.writeFile(filePath, modifiedData, 'utf8', err => {
            if (err) {
            console.error('Error writing file:', filePath, err);
            return;
            }

            console.log(`Modified file: ${filePath}`);
        });
    });
  });
});
