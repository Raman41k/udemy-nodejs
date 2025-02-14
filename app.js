const express =  require('express');

const app = express();
const appRouter = require('./src/routes/App.routes');
const PORT = process.env.PORT || 3000;

app.use('/', appRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});