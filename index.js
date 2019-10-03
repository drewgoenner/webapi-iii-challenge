// code away!
require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT;
server.listen(port, ()=> console.log(`Api listening on port ${port}`))