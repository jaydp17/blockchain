const restify = require('restify');
const uuid4 = require('uuid4');
const BlockChain = require('./blockchain');

const blockChain = new BlockChain();
const nodeName = uuid4();

const server = restify.createServer({
  name: nodeName,
  version: '1.0.0',
});

server.get('/mine', (req, res, next) => {
  res.send({ message: "we'll mine a new Block" });
  next();
});

server.post('/transactions/new', (req, res, next) => {
  res.send({ message: "we'll adda new transaction" });
  next();
});

server.get('/chain', (req, res, next) => {
  const response = {
    chain: blockChain.chain,
    length: blockChain.chain.length,
  };
  res.send(response);
  next();
});

const port = parseInt(process.env.PORT, 10) || 8080;
server.listen(port, () => {
  console.log('%s listening at %s', server.name, server.url);
});
