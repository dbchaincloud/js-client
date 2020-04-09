[English](https://github.com/dbchaincloud/js-client/blob/master/README.md)

# 库链 js-client

---

库链 js-client 是库链客户端的JavaScript 实现。利用 js-client, 开发者们可以快速启动一个库链项目。

库链 js-client 提供了如下功能：

- 产生助记词和密钥对
- 获取数据库的表
- 获取表的选项
- 获取表的列/字段
- 获取列的选项
- 插入数据到表里
- 获取表的所有行
- 按字段值搜索行/记录

### 安装

```shell
yarn add dbchain-js-client
```

或

```shell
npm install --save dbchain-js-client
```

### 使用方法

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
