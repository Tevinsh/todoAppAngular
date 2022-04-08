function requireHTPS(req, res, next) {
    if(!res.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://'+req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();
const rootDir = './dist/todoApp';
require('dotenv').config();

process.env.NODE_ENV === 'production' && app.use(requireHTTPS);

app.use(express.static(rootDir));

app.get('/*', (req,res) => res.sendFile('index.html', {root: rootDir}));

const port = process.env.PORT | 8080
app.listen(port, () => {
    console.log(`Todoapp listening at http://localhost:${port}`)
});