const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    const insertNode = (node) => {
      if (data < node.data) {
        if (!node.left) {
          node.left = newNode;
        } else {
          insertNode(node.left);
        }
      } else if (data > node.data) {
        if (!node.right) {
          node.right = newNode;
        } else {
          insertNode(node.right);
        }
      }
    };

    insertNode(this._root);
  }

  has(data) {
    const searchNode = (node) => {
      if (!node) {
        return false;
      }

      if (data < node.data) {
        return searchNode(node.left);
      } else if (data > node.data) {
        return searchNode(node.right);
      } else {
        return true;
      }
    };

    return searchNode(this._root);
  }

  find(data) {
    const searchNode = (node) => {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        return searchNode(node.left);
      } else if (data > node.data) {
        return searchNode(node.right);
      } else {
        return node;
      }
    };

    return searchNode(this._root);
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          return node.right;
        }

        if (!node.right) {
          return node.left;
        }

        const minNode = this._minNode(node.right);
        node.data = minNode.data;
        node.right = removeNode(node.right, minNode.data);
        return node;
      }
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    if (!this._root) {
      return null;
    }

    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this._root) {
      return null;
    }

    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }

  _minNode(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};