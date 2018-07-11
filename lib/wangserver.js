const fs = require('fs');
const path = require('path');



let data = fs.readFileSync(path.resolve(__dirname,'config.json'))
      