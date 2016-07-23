var fs = require('fs');
var path = require('path');
var file = path.join(__dirname, './installed.txt');
fs.writeFileSync(file, 'Done', 'UTF8');
