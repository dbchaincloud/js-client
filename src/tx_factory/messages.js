import * as MsgsFriend from "./protoBuf/msgs_friend.js"
import * as MsgsData from "./protoBuf/msgs_data.js"
import * as MsgFunction from "./protoBuf/msgs_function.js"
import {registryMessageType} from "./tendermintRpc.js"
registryMessageType('/dbchain.msgs.MsgAddFriend', MsgsFriend.MsgAddFriend)
registryMessageType('/dbchain.msgs.MsgDropFriend', MsgsFriend.MsgDropFriend)
registryMessageType('/dbchain.msgs.MsgRespondFriend', MsgsFriend.MsgRespondFriend)
registryMessageType('/dbchain.msgs.MsgInsertRow', MsgsData.MsgInsertRow)
registryMessageType('/dbchain.msgs.MsgCallFunction', MsgFunction.MsgCallFunction)


export function MsgAddFriend(
  senderAddress,
  {
    myName,
    friendAddr,
    friendName
  }
) {
  return {
    type: "/dbchain.msgs.MsgAddFriend",
    value: MsgsFriend.MsgAddFriend.fromPartial({
      ownerName: myName,
      friendAddr: friendAddr,
      friendName: friendName,
      owner: senderAddress
    })
  }
}

export function MsgDropFriend(
  senderAddress,
  {
    friendAddr
  }
) {
  return {
    type: "/dbchain.msgs.MsgDropFriend",
    value: MsgsFriend.MsgDropFriend.fromPartial({
      friendAddr: friendAddr,
      owner: senderAddress
    })
  }
}

export function MsgRespondFriend(
  senderAddress,
  {
    friendAddr,
    action
  }
) {
  return {
    type: "/dbchain.msgs.MsgRespondFriend",
    value: MsgsFriend.MsgRespondFriend.fromPartial({
      friendAddr: friendAddr,
      action: action,
      owner: senderAddress
    })
  }
}

export function MsgInsertRow(
  senderAddress,
  {
    app_code,
    table_name,
    fields
  }
) {
  return {
    type: "/dbchain.msgs.MsgInsertRow",
    value: MsgsData.MsgInsertRow.fromPartial({
      appCode: app_code,
      tableName: table_name,
      fields: fields,
      owner: senderAddress
    })
  }
}

export function MsgSend(
  senderAddress,
  {
    toAddress,
    amounts // [{ denom, amount}]
  }
) {
  return {
    type: `cosmos-sdk/MsgSend`,
    value: {
      from_address: senderAddress,
      to_address: toAddress,
      amount: amounts.map(Coin)
    }
  }
}

export function MsgCallFunction(
  senderAddress,
  { appCode, function_name, argument }
) {
  return {
    type: "/dbchain.msgs.MsgCallFunction",
    value:  MsgFunction.MsgCallFunction.fromPartial({
      appCode: appCode,
      functionName:function_name,
      argument,
      owner: senderAddress,
    }),
  };
}

function Coin({ amount, denom }) {
  return {
    amount: String(amount),
    denom
  }
}

