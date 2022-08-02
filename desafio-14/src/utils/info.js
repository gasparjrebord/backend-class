const info = {
    entryArg: process.argv.slice(2),
    system: process.platform,
    nodeVersion: process.version,
    reservedMemory: process.memoryUsage(),
    executablePath: process.execPath,
    processId: process.id,
    projectDir: process.cwd()
};
module.exports = { info };