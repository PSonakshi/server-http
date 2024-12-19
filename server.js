const http = require('http');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to my Server');
        return;
    }

    if (url === '/text' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Why did the backend developer break up with the frontend developer? Because they couldn\'t handle the requests! ');
        return;
    }

    if (url === '/html' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>This is an HTML page</h1></body></html>');
        return;
    }

    const mediaRoutes = {
        '/media/img': 'image.jpg',
        '/media/audio': 'audio.mp3',
        '/media/video': 'video.mp4'
    };

    if (mediaRoutes[url] && method === 'GET') {
        let contentType = '';
        if (url.includes('img')) contentType = 'image/jpeg';
        if (url.includes('audio')) contentType = 'audio/mpeg';
        if (url.includes('video')) contentType = 'video/mp4';

        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end('Media content here');
        return;
    }

    if (url === '/pdf' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/pdf');
        res.end('PDF content here');
        return;
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
