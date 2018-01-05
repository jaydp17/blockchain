/**
 * Holds information about other nodes
 */

const Promise = require('bluebird');
const axios = require('axios');

module.exports = class Nodes {
  constructor() {
    this.hostNames = new Set();
  }

  addNode(hostname) {
    this.hostNames.add(hostname);
  }

  removeNode(hostname) {
    this.hostNames.delete(hostname);
  }

  get size() {
    return this.hostNames.size;
  }

  /**
   * Takes the currentChain and the chains from all other nodes
   * and finds the longest chain
   * @param {Array<Block>} currentChain The current block chain
   * @return {{isReplaced: boolean, longestChain: Array<Block>} The longest chain
   */
  async getLongestChain(currentChain) {
    const chains = await Promise.map(
      this.hostNames,
      async hostname => {
        const response = await axios.get(`http://${hostname}/chain`);
        return response.data.chain;
      },
      { concurrency: 10 }
    );
    const longestChain = chains.reduce((longestChain, eachChain) => {
      if (longestChain.length > eachChain.length) return longestChain;
      return eachChain;
    }, currentChain);
    return {
      isReplaced:
        currentChain[currentChain.length - 1].previousHash !== longestChain[longestChain.length - 1].previousHash,
      longestChain,
    };
  }
};
