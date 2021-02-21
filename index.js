require('dotenv').config();
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT,  () => {
    console.log(`Server is listening now ${process.env.PORT}`);
});
// server.on('listening', () => {
//     console.log("Server is listening now");
// });