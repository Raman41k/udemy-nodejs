const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'users.json');

function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('content-type', 'text/html');
        res.write(`
            <h1>Hello, how are you?</h1>
            <form method="POST" action="/create-user">
                <input type="text" name="username">
                <button type="submit">Submit</button>
            </form>
        `);
        return res.end();
    }

    if (url === '/users') {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                res.statusCode = 500;
                return res.end('Error reading users file.');
            }

            const users = JSON.parse(data.toString());
            let html = '<ul>';

            users.forEach(user => {
                html += `<li>${user.name}</li>`;
            });

            html += '</ul>';

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(html);
            return res.end();
        });
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            const username = parsedData.split('=')[1];

            fs.stat(filePath, (err) => {
                if (err && err.code === 'ENOENT') {
                    const initialData = JSON.stringify([]);
                    fs.writeFile(filePath, initialData, (err) => {
                        if (err) {
                            res.statusCode = 500;
                            return res.end('Error creating users file.');
                        }

                        addUser(username, res);
                    });
                } else if (err) {
                    res.statusCode = 500;
                    return res.end('Error checking users file.');
                } else {
                    addUser(username, res);
                }
            });
        });
    }

    function addUser(username, res) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                return res.end('Error reading users file.');
            }

            const users = JSON.parse(data.toString());
            users.push({ name: username });

            fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.statusCode = 500;
                    return res.end('Error saving new user.');
                }

                res.statusCode = 302;
                res.setHeader('Location', '/users');
                res.end();
            });
        });
    }
}

module.exports = {
    requestHandler,
};
