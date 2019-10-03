const express = require('express');

const server = express();
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');



//custom middleware

function logger(req, res, next) {
  console.log((`${req.method} to ${req.url} at ${Date.now()}`));
  next()
};

server.use(logger);
server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/users/:id/posts', postRouter);



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});
module.exports = server;
