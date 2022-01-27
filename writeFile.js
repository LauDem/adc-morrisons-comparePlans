const fs = require('fs');

let writeFile = (filename, data) => {

    fs.writeFileSync(filename, JSON.stringify(data, null, 4))
}

module.exports = {writeFile}