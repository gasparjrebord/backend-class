const http = require('http');

const server = http.createServer( (req, res) => {
    res.end('Hi!')
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`>>>> Server listening at port http://localhost:${PORT}`)
});