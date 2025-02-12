const http = require('http');

const { requestHandler } = require('./src/routes/routes');

const PORT = process.env.PORT || 3000;

const app = http.createServer(requestHandler);

app.listen(PORT, () => {

})