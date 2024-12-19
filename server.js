const http = require('http');
const fs = require('fs');
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
        res.end('Why did the backend developer break up with the frontend developer? Because they couldn\'t handle the requests!');
        return;
    }


    const mediaRoutes = {
        '/media/img': 'image.jpg',
        '/media/audio': 'audio.mp3',
        '/media/video': 'video.mp4'
    };

    if (mediaRoutes[url] && method === 'GET') {
        const mediaPath = path.join(__dirname, 'media', mediaRoutes[url]);
        fs.readFile(mediaPath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end(`not found`);
                return;
            }
            let contentType = '';
            if (url.includes('img')) contentType = 'image/jpeg';
            if (url.includes('audio')) contentType = 'audio/mpeg';
            if (url.includes('video')) contentType = 'video/mp4';

            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(data);
        });
        return;
    }

    if (url === '/pdf' && method === 'GET') {
        const pdfPath = path.join(__dirname, 'files', 'sample.pdf');
        fs.readFile(pdfPath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('PDF not found');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/pdf');
            res.end(data);
        });
        return;
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
