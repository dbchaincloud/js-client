[中文](https://github.com/dbchaincloud/js-client/blob/master/README_ch.md)

# dbchain js-client

---

dbchain js-client is the JavaScript implementation of the client side library of dbchain, the blockchain database. With the js-client, developers can quickly start a dbchain application in minutes.

The js-client provides JavaScript functions for

* Generating mnemonic and private/public key pairs 
* Retrieving list of tables of a database
* Retrieving the options of a talbe
* Retrieving columns of a table
* Retrieving options for a column
* Inserting a row into a table
* Retrieving all rows of a table
* Searching for rows contain certain field value
 
### Install

```shell
yarn add dbchain-js-client
```

or

```shell
npm install --save dbchain-js-client
```


### Usage

#### Retrieving list of tables of a database

```javascript
import { getTables } from "dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tables = await getTables(appCode);
/*
[
  "supplier",
  "product",
  "customer"
]
*/
```

