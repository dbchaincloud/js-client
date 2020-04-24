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

async function getApps() {
  var appCode = await getAppCode() || [];
  var apps = [];
  for (var i = 0; i < appCode.length; i += 1) {
    var app = await getApp(appCode[i]);
    apps.push(app);
  }
  return apps;
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

async function getTable(appCode, tableName) {
  var uri = uriBuilder("tables", appCode, tableName);
  var response = await restGet(uri);
  var fields = response.data.result.fields;
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

async function querier(appCode, querierObj) {
  var query = Buffer.from(JSON.stringify(querierObj));
  query = bs58.encode(query);
  var uri = uriBuilder("querier", appCode, query);
  var response = await restGet(uri);
  return response.data.result;
}

//////////////////////////////////
//                              //
// other than dbchain queries //
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

export { getFriends, getPendingFriends, getAppCode, getApps, getApp, isAppUser,
         getTables, getTable, getGroups, getGroupMembers, getTableOptions, getFieldOptions,
         getAllIds, getIdsBy, getRow, getAccount, insertRow, sendToken,
         uploadFile, addFriend, respondFriend, querier
};
