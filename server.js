const express = require('express');

const server = express();



//custom middleware

function logger(req, res, next) {
  console.log((`${req.method} to ${req.url} at ${Date.now()}`));
  next()
};

server.use(logger);
server.use(express.json())



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});
module.exports = server;
