# BlockChain

A really simple proof of concept implementation of a blockchain, to learn how it works!

* It maintains an immutable chain
* Uses a really simple Proof of Work Algorithm
* Allows nodes to join in and resolve conflicts in their chains

## Easy Install (using Docker)

```sh
# builds the image and labels it to blockchain
$ docker build -t blockchain .

# run it, and bind it to port 3000
$ docker run --rm -p 3000:3000 -d blockchain:latest
```

If you want more nodes

```sh
# this one runs on port 4000
$ docker run --rm -p 4000:3000 -d blockchain:latest
# and this one runs on port 5000
$ docker run --rm -p 5000:3000 -d blockchain:latest
```

## Normal Installation (on the host)

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

## Usage

### Create a new transaction

```sh
$ curl -X POST \
  http://localhost:3000/transactions/new \
  -H 'Content-Type: application/json' \
  -d '{
	"sender": "jaydeep",
	"recipient": "nimesh",
	"amount": 25
  }'
```

### Mine a block

```sh
$ curl -X GET http://localhost:3000/mine
```

### Get the full chain

```sh
$ curl -X GET http://localhost:3000/chain
```

### Register new nodes

```sh
$ curl -X POST \
  http://localhost:3000/nodes/register \
  -H 'Content-Type: application/json' \
  -d '{
	"nodeUris": ["http://localhost:4000", "http://localhost:5000"]
}'
```

### Sync the chain

If you've followed the exact above steps, node on port 3000 has the longest chain.

Now to sync that to node running on port 4000, call

```sh
$ curl -X GET http://localhost:4000/nodes/resolve
```

_Note: This api all was on port 4000_

## License

MIT
