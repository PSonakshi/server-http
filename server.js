const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to my Server');
    }

    if (url === '/text' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Why did the backend developer break up with the frontend developer? Because they couldn\'t handle the requests! ');
    }

    if (url === '/html' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    const mediaRoutes = {
        '/media/img': 'image.jpg',
        '/media/audio': 'audio.mp3',
        '/media/video': 'video.mp4'
    };

    if (mediaRoutes[url] && method === 'GET') {
        const mediaPath = path.join(__dirname, 'media', mediaRoutes[url]);
        fs.readFile(mediaPath, (err, data) => {
            const contentType = url.includes('img') ? 'image/jpeg' :
                                url.includes('audio') ? 'audio/mpeg' : 'video/mp4';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }

    if (url === '/pdf' && method === 'GET') {
        fs.readFile(path.join(__dirname, 'files', 'sample.pdf'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'application/pdf' });
            res.end(data);
        });
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
