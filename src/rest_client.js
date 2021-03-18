import { Base64 } from 'js-base64';
import { restGet, restPost } from "./rest_lib";
import { createAccessToken } from "./access_token";
import {signAndBroadcast} from "./blockchain"
const bs58 =  require("bs58")

const queryRoot = "/dbchain";

///////////////////////
//                   //
// dbchain queries //
//                   //
///////////////////////

async function checkChainId(chainId) {
  var uri = uriBuilder("check_chain_id", chainId);
  var response = await restGet(uri);
  return response.data.result;
}

async function getFriends() {
  var uri = uriBuilder("friends");
  var response = await restGet(uri);
  if (response.data.result == null) {
    return []
  } else {
    return response.data.result
  }
}

async function getPendingFriends() {
  var uri = uriBuilder("pending_friends");
  var response = await restGet(uri);
  if (response.data.result == null) {
    return []
  } else {
    return response.data.result
  }
}

async function getAppCode(adminOnly=false) {
  var uri;
  if (adminOnly) {
    uri = uriBuilder("admin_apps");
  } else {
    uri = uriBuilder("application");
  }
  var response = await restGet(uri);
  return response.data.result;
}

async function getApp(appCode) {
  var uri = uriBuilder("application", appCode);
  var response = await restGet(uri);
  return response.data.result;
}
/**
 * If I pass true, I get all the applications that I'm an administrator. If I pass false or if I don't pass, I get all the applications in the chain
 * @param {Boolean} adminOnly true or false
 * @returns {Array} Applications I manage (I create or I am an administrator)
 */
async function getApps(adminOnly=false) {
  var appCode = await getAppCode(adminOnly) || [];
  var apps = [];
  for (var i = 0; i < appCode.length; i += 1) {
    var app = await getApp(appCode[i]);
    apps.push(app);
  }
  return apps;
}

async function isSysAdmin() {
  var uri = uriBuilder("is_sys_admin");
  var response = await restGet(uri);
  return response.data.result;
}

async function isAppUser(appCode) {
  var uri = uriBuilder("is_app_user", appCode);
  var response = await restGet(uri);
  return response.data.result;
}

async function getGroups(appCode) {
  var uri = uriBuilder("groups", appCode)
  var response = await restGet(uri);
  return response.data.result;
}

async function getGroupMemo(appCode, groupName) {
  var uri = uriBuilder("group_memo", appCode, groupName)
  var response = await restGet(uri);
  return response.data.result;
}

async function getGroupMembers(appCode, groupName) {
  var uri = uriBuilder("group", appCode, groupName)
  var response = await restGet(uri);
  return response.data.result;
}

async function getTables(appCode) {
  var uri = uriBuilder("tables", appCode)
  var response = await restGet(uri);
  return response.data.result;
}

async function getTableOptions(appCode, tableName) {
  var uri = uriBuilder("table-options", appCode, tableName);
  var response = await restGet(uri);
  return response.data.result;
}

/**
 * Query the attributes attached to the table
 * @param {String} appCode this appCode
 * @param {String} tableName The name of the table to query
 * @param {String} name To query the value, can pass or not pass, do not pass or return all，options：['fields','filter','momes','name','owner','trigger']
 * @returns Returns the corresponding property or all properties.  Object or Array
 */
async function getTableRaw(appCode, tableName, name='') {
  var uri = uriBuilder("tables", appCode, tableName);
  var response = await restGet(uri);
  if(name){
    return response.data.result[name];
  }
  return response.data.result;
}

async function getTable(appCode, tableName) {
  var fields= await getTableRaw(appCode, tableName,'fields');
  var result = [];
  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    // no need to show the system fields
    if (f == "id" || f == "created_at" || f == "created_by") {
      continue;
    }
    result.push(f);
  }
  return result;
}

async function getFieldOptions(appCode, tableName, fieldName) {
  var uri = uriBuilder("column-options", appCode, tableName, fieldName);
  var response = await restGet(uri);
  return response.data.result;
}

async function getInsertFilter(appCode, tableName) {
  var uri = uriBuilder("tables", appCode, tableName);
  var response = await restGet(uri);
  var filter = response.data.result.filter;
  return filter;
}

async function getTrigger(appCode, tableName) {
  var uri = uriBuilder("tables", appCode, tableName);
  var response = await restGet(uri);
  var trigger = response.data.result.trigger;
  return trigger;
}

async function getTableMemo(appCode, tableName) {
  var memo = await getTableRaw(appCode, tableName,'memo');
  return memo;
}

async function getAllIds(appCode, tableName) {
  var uri = uriBuilder("find_all", appCode, tableName)
  var response = await restGet(uri);
  return response.data.result;
}

async function getIdsBy(appCode, tableName, fieldName, value) {
  var uri = uriBuilder("find_by", appCode, tableName, fieldName, value)
  var response = await restGet(uri);
  return response.data.result;
}

async function getRow(appCode, tableName, id) {
  var uri = uriBuilder("find", appCode, tableName, id)
  var response = await restGet(uri);
  return response.data.result;
}

async function canInsertRow(appCode, tableName, record) {
  var recordJson = Buffer.from(JSON.stringify(record));
  var recordJsonBase58 = bs58.encode(recordJson);
  var uri = uriBuilder("can_insert_row", appCode, tableName, recordJsonBase58);
  var response = await restGet(uri);
  if (response.data.result == null) {
    return [];
  } else {
    return response.data.result;
  }
}

async function querier(appCode, querierObj) {
  var query = Buffer.from(JSON.stringify(querierObj));
  query = bs58.encode(query);
  var uri = uriBuilder("querier", appCode, query);
  var response = await restGet(uri);
  return response.data.result;
}

//////////////////////////////////
//                              //
// other than dbchain queries   //
//                              //
//////////////////////////////////

async function getAccount(address) {
  if (address == null) {
    return null;
  }
  var response = await restGet(`/auth/accounts/${address}`);
  var account;
  try {
    account = response.data.result.value;
  } catch (e) {
    return null;
  }

  if (account.address == "") {
    return null;
  }
  return account;
}

//////////////////
//              //
// transactions //
//              //
//////////////////

async function sendToken(toAddress, amount, callback) {
    await signAndBroadcast(
        'MsgSend',
        {
            toAddress,
            amounts: [{denom: 'dbctoken', amount: amount}]
        },
        callback
    );
}

async function addFriend(myName, friendAddr, friendName, callback) {
    if (friendAddr == null) {
      return
    }
    await signAndBroadcast(
        'MsgAddFriend',
        {
            myName,
            friendAddr,
            friendName
        },
        callback
    );
}

async function dropFriend(friendAddr, callback) {
    if (friendAddr == null) {
      return
    }
    await signAndBroadcast(
        'MsgDropFriend',
        {
            friendAddr
        },
        callback
    );
}

async function respondFriend(friendAddr, action, callback) {
    if (friendAddr == null) {
      return
    }
    await signAndBroadcast(
        'MsgRespondFriend',
        {
            friendAddr,
            action
        },
        callback
    );
}

async function insertRow(appCode, tableName, fields, callback) {
    var encodedFields = Base64.encode(JSON.stringify(fields))
    await signAndBroadcast(
        "MsgInsertRow",
        {
            app_code: appCode,
            table_name: tableName,
            fields: encodedFields
        },
        callback
    );
}

async function uploadFile(file) {
    var uri = uriBuilder("upload");
    var formData = new FormData();
    formData.append('file', file);
    var response = await restPost(
        uri,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return(response.data.result)
}

async function commit(callback) {
    await signAndBroadcast(
        null,
        null,
        callback
    );
}
//////////////////////
//                  //
// helper functions //
//                  //
//////////////////////

function uriBuilder(...args) {
  if (args.length < 1) {
    throw "At least one parameter is needed!";
  }
  var accessToken = createAccessToken();
  args.splice(1, 0, accessToken);
  args.unshift(queryRoot);
  return args.join("/");
}

/**
 * Executes the current library to specify a custom function
 * @param {String} appCode Your appCode
 * @param {String} FunctionName Custom function name
 * @param {Array} Argument ask sb to do sth ;
 * @param {Function} callback The callback function that fires after execution
 */
 async function callFunction(appCode, FunctionName, Argument = [], callback) {
  let data = JSON.stringify(Argument)

  await signAndBroadcast(
    'MsgCallFunction',
    {
      appCode,
      function_name: FunctionName,
      argument: data
    },
    callback
  );
}

/**
 * Executes the current library to specify a custom function
 * @param {String} appCode Your appCode
 * @param {String} FunctionName Custom function name
 * @param {Array} Argument ask sb to do sth ;
 * @param {Function} callback The callback function that fires after execution
 */
async function callCustomQuerier(appCode, FunctionName, Argument = [], callback) {
  let query = '';
  Argument[1].forEach(element => {
    query += bs58.encode(Buffer.from(element)) + '/'
  });
  let bs = query.substring(0, query.length - 1);
  let bss = bs58.encode(Buffer.from(bs))
  var uri = uriBuilder("call-custom-querier", appCode, FunctionName, bss)
  var response = await restGet(uri);
  return response.data.result;
}


export { getFriends, getPendingFriends, getAppCode, getApps, getApp, isAppUser, isSysAdmin, checkChainId,
         getTables, getTable, getGroups, getGroupMembers, getTableOptions, getFieldOptions,
         getInsertFilter, getTrigger, getTableMemo, getGroupMemo, getTableRaw, uriBuilder,
         getAllIds, getIdsBy, getRow, getAccount, insertRow, sendToken, canInsertRow,
         uploadFile, addFriend, dropFriend, respondFriend, commit, querier, callFunction ,callCustomQuerier
};
