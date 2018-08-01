const fs = require('fs')
const path = require('path')
const solc = require('solc')


const sourcePath = path.resolve(__dirname,'contracts','Lottery.sol')
let source = fs.readFileSync(sourcePath,'utf-8');
let result = solc.compile(source,1);
module.exports=result.contracts[':Lottery']
