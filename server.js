const http = require("http");
const app = require("./app");

//Access environment variable
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
