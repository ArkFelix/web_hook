// index.js

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let data = '';

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        const message = jsonData.message;
        
        console.log('Received message:', message);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Webhook received successfully');
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error parsing JSON data');
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});