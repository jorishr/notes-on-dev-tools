# Crypto module for NodeJs
Table of contents
- [Crypto module for NodeJs](#crypto-module-for-nodejs)
	- [Generate a token for serialization](#generate-a-token-for-serialization)
	- [Create a hash](#create-a-hash)
	- [Encrypt and decrypt a message](#encrypt-and-decrypt-a-message)

## Generate a token for serialization
If you need a token key to store in the `.env` file you can generate that in the NodeJs console. Pass the parameter 'hex' to the `.toString()` method to get hexadecimal values instead of byte notation.
```javascript
node 
require('crypto').randomBytes(64).toString('hex');
```

## Create a hash
Note that crypto is an asynchronous operation.
```javascript
const crypto = require('crypto');
console.log(crypto.getHashes()); 	
//-> output list of available algorithms

const hash = crypto.createHash('sha256').update('myString').digest('hex');

console.log(hash);
```

## Encrypt and decrypt a message
See [video](https://www.youtube.com/watch?v=heldAl8Cfr4) by Engineer Man