const nroCPUs = require('os').cpus().length
const info = {
    argv: process.argv.slice(2),
    system: process.platform,
    version: process.version,
    projectDir: process.cwd(),
    executablePath: process.execPath,
    processId: process.pid,
    rss: process.memoryUsage().rss,
    cpus: nroCPUs
};

module.exports = { info };