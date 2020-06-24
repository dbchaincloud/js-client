import { restGet } from "./rest_lib";
import { createAccessToken } from "./access_token";

const queryRoot = "/dbchain/oracle";

///////////////////////
//                   //
// oracle queries //
//                   //
///////////////////////

async function sendVerificationCode(mobile) {
  var uri = uriBuilder("send_verf_code", mobile);
  var response = await restGet(uri);
  return response.data.result
}

async function verifyVerificationCode(mobile, code) {
  var uri = uriBuilder("verify_verf_code", mobile, code);
  var response = await restGet(uri);
  return response.data.result
}

async function verifyIdCard(name, idNumber) {
  var uri = uriBuilder("verify_name_and_id_number", name, idNumber);
  var response = await restGet(uri);
  return response.data.result
}

async function verifyCorpInfo(corpName, regNumber, creditCode) {
  var uri = uriBuilder("verify_corp_info", corpName, regNumber, creditCode);
  var response = await restGet(uri);
  return response.data.result
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

export { sendVerificationCode, verifyVerificationCode, verifyIdCard, verifyCorpInfo };
