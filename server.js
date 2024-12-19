const http = require('http');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Welcome to my Server');
    }

    if (url === '/text' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Why did the backend developer break up with the frontend developer? Because they couldn\'t handle the requests! ');
    }

    if (url === '/html' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        return res.end('<html><body><h1>This is an HTML page</h1></body></html>');
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
        return res.end('Media content here');
    }

    if (url === '/pdf' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/pdf');
        return res.end('PDF content here');
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
