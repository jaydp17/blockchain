const SHA256 = require('crypto-js/sha256');

module.exports = class BlockChain {
  constructor() {
    this.chain = [];
    this.currentTransactions = [];

    //  Create the genesis block
    this.addBlock({ proof: 100, previousHash: 1 });
  }

  /**
   *
   * @param {Object} obj Object containing data
   * @param {number} proof The proof given by the Proof of Work algorithm
   * @param {string} previousHash Hash of previous Block
   * @return {Object} The new block
   */
  addBlock({ proof, previousHash }) {
    const block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.currentTransactions,
      proof,
      previousHash: previousHash || BlockChain.hash(this.lastBlock),
    };

    // Reset the current transaction list
    this.currentTransactions = [];

    this.chain.push(block);

    return block;
  }

  /**
   *
   * @param {Object} obj Object containing data
   * @param {string} sender Address of the sender
   * @param {string} recipient Address of the recipient
   * @param {number} amount Amount
   * @returns {number} The index of the Block that will hold this transaction
   */
  addTransaction({ sender, recipient, amount }) {
    this.currentTransactions.push({
      sender,
      recipient,
      amount,
    });
    return this.lastBlock.index + 1;
  }

  static hash(block) {
    const msg = JSON.stringify(block);
    return SHA256(msg).toString();
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }
};
