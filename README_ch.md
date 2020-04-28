[English](https://github.com/dbchaincloud/js-client/blob/master/README.md)

# 库链 js-client

---

库链 js-client 是库链客户端的JavaScript 实现。利用 js-client, 开发者们可以快速启动一个库链项目。

库链 js-client 提供了如下功能：

- 产生助记词和密钥对
- 检查是否已有密钥对
- 访问口令
- 获取数据库的表
- 获取表的选项
- 获取表的列/字段
- 获取列的选项
- 插入数据到表里
- 获取表的所有行id
- 获取表的一行
- 按字段值搜索行/记录

## 安装

```shell
yarn add dbchain-js-client
```

或

```shell
npm install --save dbchain-js-client
```

## 使用方法

#### 产生助记词和密钥对
```javascript
import { newMnemonic, createAndStoreKey } from "dbchain-js-client";

const mnemonic = newMnemonic();
// 
const passphrase = "123345678"
createAndStoreKey(mnemonic, passphrase)
```

#### 检查是否已有密钥对
```javascript
import { hasKey } from 'dbchain-js-client;
if(!hasKey()) {
  console.log("User needs to generate and save key pairs")
}
```

#### 访问口令 
```javascript
import { hasPassphrase, savePassphrase } from 'dbchain-js-client;

// when user login with a passphrase, we usually save it to browser session storage
var passphrase = "12345678"
if (savePassphrase(passphrase)) {
  console.log("passphrase saved successfully");
} else {
  console.log("passphrase is invalid");
}

if(!hasPassphrase()) {
  console.log("User needs to input passphrase");
}
```

#### 获取数据库表
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

#### 获取表的选项
```javascript
import { getTableOptions } from "dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const options = await getTableOptions(appCode, tableName);
/*
[
  "public"
]
*/
```

#### 获取表的列/字段
```javascript
import { getTable } from "dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const options = await getTable(appCode, tableName);
/*
[
  "name",
  "phone",
  "address_id"
]
*/
```
#### 获取列的选项
```javascript
import { getFieldOptions } from "dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const fieldName = "phone";
const options = await getFieldOptions(appCode, tableName, fieldName);
/*
[
  "not-null"
]
*/
```
#### 插入到表里
```javascript
import { insertRow } from "dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";

var record = {};
record.name = "Super supplier"
record.phone = "18888888888";
record.address_id = "5";

const options = await insertRow(appCode, tableName, record, function() {
  console.log("inserting record succeeded");
});
```

#### 获取表的所有行id
```javascript
import { getAllIds } from "dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const ids = await getAllIds(appCode, tableName);
/*
[
  "1",
  "2",
  "3",
  "4"
]
*/
```

#### 读取表的一行
```javascript
import { getRow } from "dbchain-js-client";

const appCode = "DJ1PGEQ45A";
const tableName = "supplier";
const record = await getRow(appCode, tableName, "1");
/*
{
  name: "Super supplier",
  phone: "18888888888",
  address_id: "5"
}
*/
```

## 软件许可
库链 js-client 采用Apache-2.0 软件许可。
