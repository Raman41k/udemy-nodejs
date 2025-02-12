const http = require('http');

const PORT = process.env.PORT || 3000;

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end("<h1>My first server!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})