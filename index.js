// const http = require('http');

// const server = http.createServer(async (req, res) => {
//     if (req.method === "GET" && req.url === "/") {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end('<h1>Hello, World!</h1>');
//     }
// });

// server.listen(3001, () => {
//     console.log("Server is listening on port 3001");
// });

const app = require("./server");
app.listen(3001, () => {
  console.log("server is running on port http://localhost:3001");
});
