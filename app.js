const express = require('express');
const app = express();
const test = require('./src/test');


app.get('/', (req, res) => {
    res.send(test.message);
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});