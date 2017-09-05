const fs = require('fs');

function check(path, callback) {
  fs.stat(path, (err) => {
    if (err) return callback(new Error('Item does not exist!'));
    return callback();
  });
}

module.exports = check;
