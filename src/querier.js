import { querier } from './rest_client'
import { getAddress } from './key_manager'

const handler = {
  get: function(target, prop) {
    switch(prop) {
      case 'table':
      case 'appCode':
      case 'commands':
      case 'find':
      case 'equal':
      case 'where':
      case 'order':
      case 'compareAll':
      case 'select':
      case 'findFirst':
      case 'findLast':
      case 'singleValue':
      case 'val':
      case 'proxyKeeper':
      case 'page':
        return Reflect.get(...arguments);
      case 'own':
        target.ownAddress();
        return target.proxyKeeper
      case 'first':
        target.findFirst();
        return target.proxyKeeper
      case 'last':
        target.findLast();
        return target.proxyKeeper
      case 'count':
        target.count();
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

  ownAddress() {
    this.commands.push({
      method: "where",
      field: "created_by",
      value: getAddress(),
      operator: '='
    });
    return this.proxyKeeper;
  }

  equal(fieldName, value) {
    this.commands.push({
      method: "where",
      field: fieldName,
      value: value,
      operator: '='
    });
    return this.proxyKeeper;
  }
  
  /**
   * 
   * @param {String} fieldName The name of the field to query
   * @param {String} value The value of the field to query
   * @param {String} symbol The contrast symbol to query.  ('>','>=','=','<','<=','≠')
   */
  where(fieldName, value, operator) {
    let obj = {
      method: "where",
      field: fieldName,
      value: value,
      operator: operator
    }
    this.commands.push(obj);
    return this.proxyKeeper;
  }

  /** 
   * Batch-add array object parameters are used when batch-add search criteria
   * @param {Array} value Batch add array object parameters, whose format is [['name1','value1'],['name2','value2','>'],...]
   */
  compareAll(value = [['', '', '']]){
    if (!Array.isArray(value)) return "格式有误"
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      if (!element[0] || !element[1]) continue;
      let obj = {
        method: 'where',
        field: element[0],
        value: element[1],
        operator: element[2] ? element[2] : '='
      };
      this.commands.push(obj);
    }
    return this.proxyKeeper;
  }

  order(fieldName, direction="asc") {
    if (direction != "asc" && direction != "desc" ) {
        return this.proxyKeeper;
    }
    this.commands.push({
      method: "order",
      field: fieldName,
      direction: direction
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

  findLast() {
    //this.singleValue = true;
    this.commands.push({
      method: "last",
    });
    return this.proxyKeeper;
  }
  /**
   * Total number of data acquired
   * @returns {count: "21220"}
   */
  count() {
    this.commands.push({
      method: "count",
    })
    return this.proxyKeeper;
  }

  /**
   * paging query
   * Query for a specified amount of data under the specified page
   * @param {Number} page 
   * @param {Number} size 
   * @returns [{id:1,...},{id:2,...}...]
   */
   page(page, size) {
    let offset = (page - 1) * size < 0 ? 0 : (page - 1) * size;
    this.commands.push({
      method: "offset",
      value: offset + ''
    })
    this.commands.push({
      method: "limit",
      value: size + ''
    })
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
