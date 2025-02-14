const path = require('path');

const renderHtml = (res, fileName) => {
    const sanitizedPath = fileName.replace(/^\/+/, '');
    const filePath = path.join(__dirname, '..', 'views', sanitizedPath + '.html');

    res.sendFile(filePath);
}

module.exports = {
    renderHtml
};