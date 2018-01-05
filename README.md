# BlockChain

A really simple proof of concept implementation of a blockchain, to learn what it's all about.

* It maintains an immutable chain
* Uses a really simple Proof of Work Algorithm
* Allows nodes to join in and resolve conflicts in their chains

## Installation

Make sure [node.js 8.9+](https://nodejs.org) installed

```sh
# install dependencies
$ npm install

# run it on port 3000
$ PORT=3000 node src/index.js
```

If you want more nodes

```sh
$ PORT=4000 node src/index.js
$ PORT=5000 node src/index.js
```

## License

MIT
