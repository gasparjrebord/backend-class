const yargs = require('yargs')(process.argv.slice(2));
const args = yargs
    .default({
        port: 8080,
        mode: 'fork'
    })
    .alias({ 
        p: 'port', 
        m: 'mode'
    })
    .argv

module.exports = args
