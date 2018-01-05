const restify = require('restify');
const uuid4 = require('uuid4');
const errs = require('restify-errors');
const URL = require('url');

const BlockChain = require('./blockchain');
const Nodes = require('./nodes');

const blockChain = new BlockChain();
const nodes = new Nodes();

const nodeName = uuid4();

const server = restify.createServer({
  name: nodeName,
  version: '1.0.0',
});

server.use(restify.plugins.bodyParser());

server.get('/mine', (req, res, next) => {
  const lastBlock = blockChain.lastBlock;
  const lastProof = lastBlock.proof;
  const currentProof = BlockChain.calculateProof(lastProof);

  // The Miner must receive a reward for finding the proof.
  // The sender is '0' to signify that this node has mined a new coin.
  blockChain.addTransaction({
    sender: '0',
    recipient: nodeName,
    amount: 1,
  });

  const previousHash = BlockChain.hash(blockChain.lastBlock);
  const newBlock = blockChain.addBlock({ proof: currentProof, previousHash });

  res.send({
    ...newBlock,
    message: 'New block forged',
  });
  next();
});

server.post('/transactions/new', (req, res, next) => {
  const { sender, recipient, amount } = req.body;
  if (!sender || !recipient || !amount) {
    return next(new errs.BadRequestError('Missing parameters'));
  }

  // create a new Transaction
  const blockIndex = blockChain.addTransaction({ sender, recipient, amount });

  res.send({ message: `Transaction will be added to Block ${blockIndex}` });
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

server.post('/nodes/register', (req, res, next) => {
  const { nodeUris } = req.body;
  const hostNames = nodeUris.map(nodeUri => URL.parse(nodeUri).host);
  for (const hostname of hostNames) {
    nodes.addNode(hostname);
  }
  res.send({
    message: 'New nodes have been added',
    totalNodes: nodes.size,
  });
  next();
});

const port = parseInt(process.env.PORT, 10) || 8080;
server.listen(port, () => {
  console.log('%s listening at %s', server.name, server.url);
});
