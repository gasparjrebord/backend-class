const autocannon = require('autocannon');
const {PassThrough} = require('stream');

const run = (url) => {
    const buffer = [];
    const outputStream = new PassThrough();
    const inst = autocannon({
        url,
        connections: 100,
        duration: 20
    });

    autocannon.track(inst, {outputStream});
    outputStream.on('data', data => buffer.push(data));
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buffer));
    });
};

console.log('Running tests...');

run(`http://localhost:8080/api/info`);