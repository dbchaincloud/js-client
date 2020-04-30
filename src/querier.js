import { querier } from './rest_client'

const handler = {
  get: function(target, prop) {
    switch(prop) {
      case 'appCode':
      case 'commands':
      case 'find':
      case 'equal':
      case 'select':
      case 'findFirst':
      case 'singleValue':
      case 'val':
      case 'proxyKeeper':
        return Reflect.get(...arguments);
      case 'first':
        target.findFirst();
        return target.proxyKeeper
      default:
        target.table(prop);
        return target.proxyKeeper
    }
  }
};

function Querier(appCode) {
  var q = new InternalQuerier(appCode);
  var proxy = new Proxy(q, handler);
  q.proxyKeeper = proxy;
  return proxy
}

class InternalQuerier {
  constructor (appCode) {
    this.appCode = appCode;
    this.commands = [];
    this.singleValue = false;
    this.proxyKeeper = null;
  }

  table(tableName) {
    this.singleValue = false;
    this.commands.push({
      method: "table",
      table: tableName
    });
    return this.proxyKeeper;
  }

  find(id) {
    this.commands.push({
      method: "find",
      id: id
    });
    return this.proxyKeeper;
  }

  select(...args) {
    this.commands.push({
      method: "select",
      fields: args.join()
    });
    return this.proxyKeeper;
  }

  equal(fieldName, value) {
    this.commands.push({
      method: "equal",
      field: fieldName,
      value: value
    });
    return this.proxyKeeper;
  }

  findFirst() {
    this.singleValue = true;
    this.commands.push({
      method: "first",
    });
    return this.proxyKeeper;
  }

  last() {
    this.commands.push({
      method: "last",
    });
    return this.proxyKeeper;
  }

  async val() {
    var result = await querier(this.appCode, this.commands);
    if (result.length > 0 && this.singleValue) {
        return result[0]
    } else {
        return result ;
    }
  }
}

export { Querier };
